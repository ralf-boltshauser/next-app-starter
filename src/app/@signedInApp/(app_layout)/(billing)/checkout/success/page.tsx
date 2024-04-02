import { AnimatedButton } from '@/components/ui/animated-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getUserTier } from '@/lib/auth';
import { plans } from '@/lib/plans';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default async function CheckoutSuccess() {
  const tier = await getUserTier();

  const pricingPlan = plans.find((plan) => plan.tier === tier);

  if (!pricingPlan) {
    return <div>There was an error processing your payment.</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">Checkout Success</h1>
      <p>
        Your payment has been processed successfully and you now have access to
        the following tier:
      </p>
      <Card className="mt-5 max-w-xs">
        <CardHeader>
          <CardTitle className="text-xl">{pricingPlan.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            {pricingPlan.includedFeatures.map((feature) => (
              <div key={feature} className="mb-2 flex items-center gap-2">
                <CheckCircledIcon className="h-6 w-6 rounded-full bg-primary text-white" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <AnimatedButton className="mt-5">
        <Link href="/app">Go to Dashboard</Link>
      </AnimatedButton>
    </div>
  );
}
