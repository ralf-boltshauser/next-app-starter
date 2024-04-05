import {
  canAccessFeature,
  FeatureList,
  getRequiredTier,
} from '@/lib/access/access';
import { plans } from '@/lib/stripe/plans';
import Link from 'next/link';
import { Button } from './button';

export default async function ConditionalPlanRender({
  feature,
  children,
  fakeChildren,
  type = 'blur',
  ...props
}: {
  feature: FeatureList;
  children: React.ReactNode;
  fakeChildren?: React.ReactNode;
  type?: 'hidden' | 'blur';
}) {
  const canAccess = await canAccessFeature(feature);
  const requiredTier = await getRequiredTier(feature);

  if (canAccess) {
    return <>{children}</>;
  }

  if (type === 'hidden') {
    return null;
  }

  return (
    <Link href={`/pricing?plan=${requiredTier.valueOf()}`} passHref {...props}>
      <div className="relative h-full w-full">
        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white/40 dark:bg-black/40">
          <div className="flex flex-col justify-center gap-2">
            <Button className="">
              Upgrade to {plans.find((plan) => plan.tier == requiredTier)?.name}{' '}
              plan
            </Button>
          </div>
        </div>
        <div className={`h-full w-full ${type === 'blur' ? 'blur-sm' : ''}`}>
          {fakeChildren || children}
        </div>
      </div>
    </Link>
  );
}
