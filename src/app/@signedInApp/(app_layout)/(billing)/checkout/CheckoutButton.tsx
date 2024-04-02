'use client';

import { AnimatedButton } from '@/components/ui/animated-button';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export default function CheckoutButton({ priceId }: { priceId: string }) {
  const { data: user } = useSession();
  const handleCheckout = async () => {
    if (!user) {
      toast.error('You must be signed in to purchase a plan');
      return;
    }

    const stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
    );

    const stripe = await stripePromise;
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
      }),
    });
    const session = await response.json();
    await stripe?.redirectToCheckout({ sessionId: session.id });
  };

  return (
    <AnimatedButton className="btn btn-accent" onClick={handleCheckout}>
      Buy Now
    </AnimatedButton>
  );
}
