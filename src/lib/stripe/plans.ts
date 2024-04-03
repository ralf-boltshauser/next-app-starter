import { Tiers } from '../access/access';

export interface PricingPlan {
  tier: Tiers;
  name: string;
  price: number;
  recommended: boolean;
  priceIds: string[];
  includedFeatures: string[];
  excludedFeatures?: string[];
}

export const plans = [
  {
    tier: Tiers.Basic,
    name: 'Basic',
    price: 9.99,
    recommended: false,
    includedFeatures: ['Feature 1'],
    excludedFeatures: ['Feature 4', 'Feature 5'],
    priceIds: ['price_1P0mCUL7TnHkkLFAqUtd22yG'],
  },
  {
    tier: Tiers.Pro,
    name: 'Pro',
    price: 19.99,
    recommended: true,
    includedFeatures: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
    excludedFeatures: ['Feature 5'],
    priceIds: ['price_1P11ZaL7TnHkkLFATt7oxatp'],
  },
  {
    tier: Tiers.Enterprise,
    name: 'Enterprise',
    price: 29.99,
    recommended: false,
    priceIds: ['price_1P0mCUL7TnHkkLFAZaskie6y'],
    includedFeatures: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
      'Feature 4',
      'Feature 5',
    ],
  },
] as PricingPlan[];
