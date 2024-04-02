import { getSessionUser } from '@/lib/auth';
import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const user = await getSessionUser();

  if (!user || !user.dbId || !user.email) {
    return Response.redirect('/auth/sign-in');
  }

  try {
    const { priceId } = await request.json();

    const session = await stripe.checkout.sessions.create({
      metadata: {
        user_id: user.dbId,
      },
      customer_email: user.email,
      payment_method_types: ['card'],
      line_items: [
        {
          // base subscription
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${request.headers.get('origin')}/checkout/success`,
      cancel_url: `${request.headers.get('origin')}/checkout/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
