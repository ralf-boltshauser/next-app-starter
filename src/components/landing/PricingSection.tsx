'use client';
import { plans } from '@/lib/stripe/plans';
import { useSearchParams } from 'next/navigation';
import PlanPricing from './PlanPricing';

export default function PricingSection({
  landing = true,
}: {
  landing?: boolean;
}) {
  const queryParams = useSearchParams();

  const preferredPlanId = queryParams.get('plan');
  return (
    <>
      <div id="pricing"></div>
      <div className="mx-5 mt-5 md:mx-auto md:mt-24 md:max-w-4xl">
        <h3 className="text-lg text-primary">Pricing</h3>
        <h2 className="text-4xl font-bold">
          {preferredPlanId ? (
            `For this feature you need the ${plans.find((plan) => plan.tier.valueOf() == parseInt(preferredPlanId))?.name ?? 'Lowest'} plan`
          ) : (
            <span>
              Choose the right pricing plan
              <br /> for your and your business
            </span>
          )}
        </h2>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-4 md:flex-row">
          {plans.map((plan) => (
            <PlanPricing
              key={plan.name}
              plan={plan}
              recommended={
                preferredPlanId
                  ? plan.tier.valueOf() == parseInt(preferredPlanId)
                  : undefined
              }
              landing={landing}
            />
          ))}
        </div>
      </div>
    </>
  );
}
