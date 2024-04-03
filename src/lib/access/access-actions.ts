'use server';
import { canAccessFeature, FeatureList } from './access';

export async function canAccessFeatureAction(feature: FeatureList) {
  return await canAccessFeature(feature);
}
