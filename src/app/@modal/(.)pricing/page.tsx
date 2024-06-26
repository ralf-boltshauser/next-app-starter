'use client';
import { H5 } from '@/components/design-system/headings';
import PlanPricing from '@/components/landing/PlanPricing';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { plans } from '@/lib/stripe/plans';
import { useSearchParams } from 'next/navigation';
import { Modal } from './modal';

export default function PricingModal() {
  const queryParams = useSearchParams();

  const preferredPlanId = queryParams.get('plan');
  return (
    <Modal>
      <div className="mx-5 mt-5 max-h-[95vh] text-center md:mx-auto md:mb-16 md:max-h-screen md:max-w-6xl">
        <H5>Pricing</H5>
        {preferredPlanId ? (
          <h2 className="text-4xl ">
            For this feature you need the{' '}
            <span className="font-bold">
              {plans.find(
                (plan) => plan.tier.valueOf() == parseInt(preferredPlanId)
              )?.name ?? 'Lowest'}{' '}
              plan
            </span>
          </h2>
        ) : (
          <h2 className="text-4xl font-bold">
            Choose the right pricing plan
            <br /> for your and your business
          </h2>
        )}
        <div className="mt-8 flex h-fit max-h-[70vh] max-w-[100vw] flex-col items-stretch justify-start gap-4 overflow-scroll px-5 md:max-h-none md:max-w-none md:flex-row md:justify-center md:overflow-auto  md:pb-16">
          {plans.map((plan) => (
            <PlanPricing
              key={plan.name}
              plan={plan}
              recommended={
                preferredPlanId
                  ? plan.tier.valueOf() == parseInt(preferredPlanId)
                  : undefined
              }
              landing={false}
            />
          ))}
          <DialogClose className="my-8 md:hidden">
            <Button>Close</Button>
          </DialogClose>
        </div>
      </div>
    </Modal>
  );
}
