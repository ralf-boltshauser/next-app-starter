import { getSessionUser } from '../auth/auth';
import { prisma } from '../client';

export enum FeatureList {
  PremiumFeature = 'PremiumFeature',
}

export enum Tiers {
  // TODO sync tiers with Database
  // Be careful, free tier is handled specially in the userHasTier function!
  Free = 0,
  Basic = 1,
  Pro = 2,
  Enterprise = 3,
}

export async function canAccessFeature(feature: FeatureList): Promise<boolean> {
  const user = await getSessionUser();

  const usersWithAccess = await prisma.user.findUnique({
    where: { id: user.dbId },
    include: {
      stripeCustomer: {
        include: {
          tier: {
            include: {
              features: {
                where: {
                  name: feature,
                },
              },
            },
          },
        },
      },
    },
  });

  // check if stripe customer is still active
  if (
    !usersWithAccess?.stripeCustomer?.tier ||
    !usersWithAccess?.stripeCustomer?.planActive
  ) {
    return false;
  }

  return (usersWithAccess?.stripeCustomer?.tier.features.length ?? 0) > 0
    ? true
    : false;
}

export async function userHasTier(tier: Tiers): Promise<boolean> {
  // TODO special handling of free tier
  if (tier === Tiers.Free) return true;
  const user = await getSessionUser();

  const usersWithAccess = await prisma.user.findUnique({
    where: { id: user.dbId },
    include: {
      stripeCustomer: {
        include: {
          tier: true,
        },
      },
    },
  });

  // check if stripe customer is still active
  if (
    !usersWithAccess?.stripeCustomer?.tier ||
    !usersWithAccess?.stripeCustomer?.planActive
  ) {
    return false;
  }

  const tierId = usersWithAccess?.stripeCustomer?.tier.id;

  return tierId ? tierId >= tier : false;
}

export async function getRequiredTier(feature: FeatureList): Promise<Tiers> {
  const resFeature = await prisma.feature.findUnique({
    where: { name: feature.toString() },
    include: {
      tiers: true,
    },
  });

  const lowestTierId = resFeature?.tiers.reduce((prev, curr) =>
    prev.id < curr.id ? prev : curr
  )?.id;

  return lowestTierId ?? Tiers.Free;
}
