import { AnimatedButton } from '@/components/ui/animated-button';
import Link from 'next/link';

export default function CheckoutCancel() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Checkout Cancel</h1>
      <p>
        Something went wrong with your payment, please try again later or
        contact support!
      </p>
      <Link href={'/pricing'} passHref>
        <AnimatedButton className="mt-5">Back to Pricing</AnimatedButton>
      </Link>
    </div>
  );
}
