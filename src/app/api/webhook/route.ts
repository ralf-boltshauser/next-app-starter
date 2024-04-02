// TODO this is not ideal yet, stripe has a way to upgrade tiers etc, I just delete the old one and add a new! I need to remove the unique userId constraint for StripeCustomer and then need to adjust the code everywhere
import { prisma } from '@/lib/client';
import { plans } from '@/lib/plans';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from './../../../lib/stripe';

export async function POST(request: NextRequest) {
  let event;
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('stripe-signature');

    try {
      event = stripe.webhooks.constructEvent(
        rawBody,
        signature!,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: any) {
      console.error(`Webhook signature verification failed: ${error.message}`);
      return NextResponse.json({ message: 'Webhook Error' }, { status: 400 });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  try {
    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session: Stripe.Checkout.Session = event.data.object;
      const userId = session.metadata?.user_id;

      if (!userId) {
        return NextResponse.json(
          { message: 'No user_id in metadata' },
          { status: 400 }
        );
      }

      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        event.data.object.id,
        {
          expand: ['line_items'],
        }
      );
      const lineItems = sessionWithLineItems.line_items;

      const priceId = lineItems?.data[0].price?.id;

      if (!priceId) {
        return NextResponse.json(
          { message: 'No price_id in line_items' },
          { status: 400 }
        );
      }

      // Create or update the stripe_customer_id in the stripe_customers table
      if (!session.customer || !session.subscription) {
        return NextResponse.json(
          { message: 'No customer or subscription in session' },
          { status: 400 }
        );
      }

      // check if a stripe customer with subscription id already exists
      const disconnectedSubscription = await prisma.stripeCustomer.findFirst({
        where: {
          AND: [
            { subscriptionId: session.subscription.toString() },
            { userId: null },
          ],
        },
      });

      if (disconnectedSubscription) {
        const existingSubscriptions = await prisma.stripeCustomer.findUnique({
          where: { userId: userId },
        });
        if (existingSubscriptions && existingSubscriptions.subscriptionId) {
          // cancel the existing subscription
          await cancelSubscription(existingSubscriptions.subscriptionId);
        }

        // connect the subscription to the user and update
        await prisma.stripeCustomer.update({
          where: { id: disconnectedSubscription.id },
          data: {
            userId: userId,
            stripeCustomerId: session.customer.toString(),
            tierId:
              plans.find((plan) => plan.priceIds?.includes(priceId))?.tier ?? 0,
            subscriptionId: session.subscription.toString(),
            planActive: true,
            planExpires: null,
          },
        });
      } else {
        // create a new stripe customer
        await prisma.stripeCustomer.upsert({
          where: {
            userId: userId,
          },
          update: {
            stripeCustomerId: session.customer.toString(),
            tierId:
              plans.find((plan) => plan.priceIds?.includes(priceId))?.tier ?? 0,
            subscriptionId: session.subscription.toString(),
            planActive: true,
            planExpires: null,
          },
          create: {
            userId: userId,
            tierId:
              plans.find((plan) => plan.priceIds?.includes(priceId))?.tier ?? 0,
            stripeCustomerId: session.customer.toString(),
            subscriptionId: session.subscription.toString(),
            planActive: true,
            planExpires: null,
          },
        });
      }
    }

    if (event.type === 'customer.subscription.updated') {
      const subscription: Stripe.Subscription = event.data.object;

      // Update the stripe_customers table with the new subscription data
      await prisma.stripeCustomer.upsert({
        where: {
          stripeCustomerId: subscription.customer.toString(),
          subscriptionId: subscription.id,
        },
        update: {
          tierId:
            plans.find((plan) =>
              plan.priceIds?.includes(subscription.items.data[0].price.id)
            )?.tier ?? 0,
          stripeCustomerId: subscription.customer.toString(),
          subscriptionId: subscription.id,
          planExpires: subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000)
            : null,
        },
        create: {
          tierId:
            plans.find((plan) =>
              plan.priceIds?.includes(subscription.items.data[0].price.id)
            )?.tier ?? 0,
          stripeCustomerId: subscription.customer.toString(),
          planActive: true,
          subscriptionId: subscription.id,
          planExpires: subscription.cancel_at
            ? new Date(subscription.cancel_at * 1000)
            : null,
        },
      });
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription: Stripe.Subscription = event.data.object;

      const stripeCustomer = await prisma.stripeCustomer.findFirst({
        where: { subscriptionId: subscription.id },
      });

      if (!stripeCustomer) {
        return NextResponse.json(
          { message: 'No stripe customer found' },
          { status: 404 }
        );
      }

      // Update the stripe_customers table to mark the subscription as inactive
      await prisma.stripeCustomer.update({
        where: { subscriptionId: subscription.id },
        data: {
          planActive: false,
          planExpires: subscription.canceled_at
            ? new Date(subscription.canceled_at * 1000)
            : null,
          subscriptionId: null,
        },
      });
    }

    return NextResponse.json({ message: 'success' });
  } catch (error: any) {
    console.error(event.type);
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

async function cancelSubscription(subscriptionId: string) {
  await prisma.stripeCustomer.delete({
    where: { subscriptionId: subscriptionId },
  });
  await stripe.subscriptions.cancel(subscriptionId);
}
