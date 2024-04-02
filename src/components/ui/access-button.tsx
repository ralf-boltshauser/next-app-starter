'use client';
import { FeatureList } from '@/lib/access';
import { canAccessFeatureAction } from '@/lib/access-actions';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AnimatedButton } from './animated-button';
import { ButtonProps } from './button';

const AccessButton = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & {
    feature: FeatureList;
  }
>(async ({ feature, ...props }, ref) => {
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      const access = await canAccessFeatureAction(feature);
      setCanAccess(access);
    };
    checkAccess();
  }, [feature]);

  return canAccess ? (
    <AnimatedButton {...props} type="submit">
      {props.children}
    </AnimatedButton>
  ) : (
    <Link href={'/pricing'} passHref>
      <AnimatedButton {...props} onClick={undefined}>
        {props.children}
      </AnimatedButton>
    </Link>
  );
});
AccessButton.displayName = 'AccessButton';

export { AccessButton };
