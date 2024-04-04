import { Tiers, userHasTier } from '@/lib/access/access';
import Link from 'next/link';

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
    <Link
      href={`/pricing?plan=${tier.valueOf()}`}
      passHref
      className="h-full w-full blur-sm"
      {...props}
    >
      {fakeChildren || children}
    </Link>
  );
}
