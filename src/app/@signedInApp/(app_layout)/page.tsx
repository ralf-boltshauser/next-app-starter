import { AccessButton } from '@/components/ui/access-button';
import ConditionalTierRender from '@/components/ui/conditional-tier-render';
import { Input } from '@/components/ui/input';
import { FeatureList, Tiers } from '@/lib/access/access';
import { sendMail } from '@/lib/mail/mail';
import { fromMail } from '@/lib/mail/mail-types';

export default function App() {
  const sendSGMail = async (formData: FormData) => {
    'use server';
    sendMail({
      to: 'ra.boltshauser3@gmail.com',
      from: fromMail,
      subject: 'Test',
      text: formData.get('content') as string,
      html: `<strong>${formData.get('content')}</strong>`,
    });
  };
  return (
    <div>
      <h2 className="text-3xl font-semibold">App</h2>

      <h3 className="text-2xl">Send E-mail</h3>
      <form action={sendSGMail} className="flex gap-2">
        <Input name="content" type="text" placeholder="E-mail content" />
        <AccessButton type="submit" feature={FeatureList.PremiumFeature}>
          <p>Premium Feature</p>
        </AccessButton>
      </form>
      <h3 className="text-2xl">Tiers</h3>
      <ConditionalTierRender tier={Tiers.Free}>
        <div>Free Tier</div>
      </ConditionalTierRender>
      <ConditionalTierRender tier={Tiers.Basic}>
        <div>Basic Tier</div>
      </ConditionalTierRender>
      <ConditionalTierRender tier={Tiers.Pro} fakeChildren={<div>Nr. </div>}>
        <div>4</div>
      </ConditionalTierRender>
    </div>
  );
}
