import { H1 } from '@/components/design-system/headings';
import { AnimatedButton } from '@/components/ui/animated-button';
import Link from 'next/link';

export default function CheckoutCancel() {
  return (
    <div>
      <H1>Checkout Cancel</H1>
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
