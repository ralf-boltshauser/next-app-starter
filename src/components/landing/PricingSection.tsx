import PlanPricing from './PlanPricing';

export interface PricingPlan {
  name: string;
  price: number;
  recommended: boolean;
  included_features: string[];
  excluded_features?: string[];
}

export default function PricingSection() {
  // TODO fetch this from stripe api and stripe plans
  const plans = [
    {
      name: 'Basic',
      price: 9.99,
      recommended: false,
      included_features: ['Feature 1'],
      excluded_features: ['Feature 4', 'Feature 5'],
    },
    {
      name: 'Pro',
      price: 19.99,
      recommended: true,
      included_features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
      excluded_features: ['Feature 5'],
    },
    {
      name: 'Enterprise',
      price: 29.99,
      recommended: false,
      included_features: [
        'Feature 1',
        'Feature 2',
        'Feature 3',
        'Feature 4',
        'Feature 5',
      ],
    },
  ] as PricingPlan[];
  return (
    <div className="mx-5 mt-5 md:mx-auto md:mt-16 md:max-w-4xl">
      <h3 className="text-lg text-primary">Pricing</h3>
      <h2 className="text-4xl font-bold">
        Choose the right pricing plan
        <br /> for your and your business
      </h2>
      <div className="mt-8 flex flex-col items-stretch justify-center gap-4  md:flex-row">
        {plans.map((plan) => (
          <PlanPricing key={plan.name} plan={plan} />
        ))}
      </div>
    </div>
  );
}
