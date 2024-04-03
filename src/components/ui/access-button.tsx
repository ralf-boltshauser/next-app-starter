import {
  canAccessFeature,
  FeatureList,
  getRequiredTier,
} from '@/lib/access/access';
import Link from 'next/link';
import { AnimatedButton } from './animated-button';
import { ButtonProps } from './button';

export async function AccessButton({
  children,
  feature,
  ...props
}: ButtonProps & {
  feature: FeatureList;
  children: React.ReactNode;
}) {
  const canAccess = await canAccessFeature(feature);
  const requiredTier = await getRequiredTier(feature);
  return canAccess ? (
    <AnimatedButton {...props} type="submit" layoutId="test">
      {children}
    </AnimatedButton>
  ) : (
    <Link href={`/pricing?plan=${requiredTier.valueOf()}`}>
      <AnimatedButton {...props} onClick={undefined} layoutId="test">
        {children}
      </AnimatedButton>
    </Link>
  );
}
