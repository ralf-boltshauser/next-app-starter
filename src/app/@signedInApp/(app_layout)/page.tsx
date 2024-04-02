import { AccessButton } from '@/components/ui/access-button';
import ConditionalTierRender from '@/components/ui/conditional-tier-render';
import { FeatureList, Tiers } from '@/lib/access';

export default function App() {
  return (
    <div>
      <h2>App</h2>

      <AccessButton feature={FeatureList.PremiumFeature}>
        <p>Premium Feature</p>
      </AccessButton>
      <ConditionalTierRender tier={Tiers.Free}>
        <div>Free Tier</div>
      </ConditionalTierRender>
      <ConditionalTierRender tier={Tiers.Basic}>
        <div>Basic Tier</div>
      </ConditionalTierRender>
      <ConditionalTierRender
        tier={Tiers.Pro}
        fakeChildren={
          <div>This is way longer than the actual pro tier tag</div>
        }
      >
        <div>Pro Tier</div>
      </ConditionalTierRender>
    </div>
  );
}
