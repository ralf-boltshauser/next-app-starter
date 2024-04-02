'use server';

import { getSessionUser } from '@/lib/auth';
import { prisma } from '@/lib/client';
import { stripe } from '@/lib/stripe';

export async function createPortalSession() {
  const user = await getSessionUser();

  if (!user || !user.dbId) {
    throw new Error('User not found');
  }
  const stripeCustomer = await prisma.stripeCustomer.findFirst({
    where: { userId: user.dbId },
  });

  if (!stripeCustomer) {
    throw new Error('Stripe customer not found');
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomer?.stripeCustomerId,
    return_url: process.env.NEXTAUTH_URL,
  });

  return { id: portalSession.id, url: portalSession.url };
}
