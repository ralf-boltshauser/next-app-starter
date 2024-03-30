'use client';

import { CheckCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { AnimatedButton } from '../ui/animated-button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { PricingPlan } from './PricingSection';

export default function PlanPricing({ plan }: { plan: PricingPlan }) {
  return (
    <motion.div
      key={plan.name}
      whileHover={{ scale: 1.02 }}
      className="flex-grow"
    >
      <Card
        className={`mt-4 flex h-full min-w-[15vw] flex-col justify-start gap-2 text-start ${plan.recommended ? 'border-4 border-primary' : 'my-4'}`}
      >
        <CardHeader className="">
          <CardTitle
            className={`text-2xl ${plan.recommended ? '' : ' font-normal'}`}
          >
            {plan.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="mb-5 flex min-h-32 min-w-32 items-center justify-center rounded-lg bg-secondary">
            <p className="text-3xl font-semibold text-black">${plan.price}</p>
          </div>
          <div>
            {plan.included_features.map((feature) => (
              <div key={feature} className="mb-2 flex items-center gap-2">
                <CheckCircledIcon className="h-6 w-6 rounded-full bg-primary text-white" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div>
            {plan.excluded_features?.map((feature) => (
              <div key={feature} className="mb-2 flex items-center gap-2">
                <MinusCircledIcon className=" h-6 w-6 rounded-full" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <AnimatedButton>Get Started</AnimatedButton>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
