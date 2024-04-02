import { canAccessFeature, FeatureList, getRequiredTier } from '@/lib/access';
import Link from 'next/link';
import React from 'react';
import { AnimatedButton } from './animated-button';
import { ButtonProps } from './button';

const AccessButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    feature: FeatureList;
  }
>(async ({ feature, ...props }, ref) => {
  const canAccess = await canAccessFeature(feature);

  const requiredTier = await getRequiredTier(feature);

  return canAccess ? (
    <AnimatedButton {...props} type="submit" layoutId="test">
      {props.children}
    </AnimatedButton>
  ) : (
    <Link href={`/pricing?plan=${requiredTier.valueOf()}`} passHref>
      <AnimatedButton {...props} onClick={undefined} layoutId="test">
        {props.children}
      </AnimatedButton>
    </Link>
  );
});
AccessButton.displayName = 'AccessButton';

export { AccessButton };
