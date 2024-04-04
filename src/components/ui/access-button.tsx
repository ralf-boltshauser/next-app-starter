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
    <AnimatedButton {...props} type="submit">
      {children}
    </AnimatedButton>
  ) : (
    <Link
      href={`/pricing?plan=${requiredTier.valueOf()}`}
      className={props.className}
    >
      <AnimatedButton {...props} onClick={undefined} className="">
        {children}
      </AnimatedButton>
    </Link>
  );
}
