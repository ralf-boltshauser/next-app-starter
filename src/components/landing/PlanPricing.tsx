'use client';

import CheckoutButton from '@/app/@signedInApp/(app_layout)/(billing)/checkout/CheckoutButton';
import { PricingPlan } from '@/lib/plans';
import { CheckCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AnimatedButton } from '../ui/animated-button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function PlanPricing({
  plan,
  landing,
  recommended,
}: {
  plan: PricingPlan;
  landing: boolean;
  recommended?: boolean;
}) {
  const query = useSearchParams();
  const planId = query.get('plan');
  const isRecommended = recommended ?? plan.recommended;
  return (
    <div className="flex flex-grow flex-col items-center justify-end">
      <h2 className="h-6 text-xl font-semibold">
        {isRecommended ? (planId ? 'Required' : 'Recommended') : ''}
      </h2>
      <motion.div
        key={plan.name}
        whileHover={{ scale: 1.02 }}
        className="flex-grow"
      >
        <Card
          className={`mt-4 flex h-full min-w-[300px] flex-col justify-start gap-2 text-start ${isRecommended ? 'border-4 border-primary' : 'my-4'}`}
        >
          <CardHeader className="">
            <CardTitle
              className={`text-2xl ${isRecommended ? '' : ' font-normal'}`}
            >
              {plan.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-5 flex min-h-32 min-w-32 items-center justify-center rounded-lg bg-secondary">
              <p className="text-3xl font-semibold text-black">${plan.price}</p>
            </div>
            <div>
              {plan.includedFeatures.map((feature) => (
                <div key={feature} className="mb-2 flex items-center gap-2">
                  <CheckCircledIcon className="h-6 w-6 rounded-full bg-primary text-white" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <div>
              {plan.excludedFeatures?.map((feature) => (
                <div key={feature} className="mb-2 flex items-center gap-2">
                  <MinusCircledIcon className=" h-6 w-6 rounded-full" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            {landing ? (
              <AnimatedButton asChild>
                <Link href={`/auth/sign-in`}>Get Started</Link>
              </AnimatedButton>
            ) : (
              <CheckoutButton priceId={plan.priceIds[0]} />
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
