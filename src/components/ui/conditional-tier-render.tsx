import { Tiers, userHasTier } from '@/lib/access/access';
import { plans } from '@/lib/stripe/plans';
import Link from 'next/link';
import { Button } from './button';

export default async function ConditionalTierRender({
  tier,
  children,
  fakeChildren,
  type = 'blur',
  ...props
}: {
  tier: Tiers;
  children: React.ReactNode;
  fakeChildren?: React.ReactNode;
  type?: 'hidden' | 'blur';
}) {
  const canAccess = await userHasTier(tier);

  if (canAccess) {
    return <>{children}</>;
  }

  if (type === 'hidden') {
    return null;
  }

  return (
    <Link href={`/pricing?plan=${tier.valueOf()}`} passHref {...props}>
      <div className="relative h-full w-full">
        <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white/40 dark:bg-black/40">
          <div className="flex flex-col justify-center gap-2">
            <Button className="">
              Upgrade to {plans.find((plan) => plan.tier == tier)?.name} plan
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
