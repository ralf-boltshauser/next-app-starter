import { Tiers, userHasTier } from '@/lib/access';
import Link from 'next/link';

export default async function ConditionalTierRender({
  tier,
  children,
  fakeChildren,
  type = 'blur',
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
    <>
      <Link
        href={`/pricing?plan=${tier.valueOf()}`}
        passHref
        className="blur-sm"
      >
        {fakeChildren || children}
      </Link>
    </>
  );
}