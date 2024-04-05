import Link from 'next/link';

import { H1 } from '@/components/design-system/headings';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ConditionalPlanRender from '@/components/ui/conditional-plan-render';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FeatureList } from '@/lib/access/access';
import { getSessionUser } from '@/lib/auth/auth';
import { prisma } from '@/lib/client';
import { redirect } from 'next/navigation';
import PortalButton from './_billing/PortalButton';
import DeleteAccountComponent from './_profile/DeleteAccountComponent';
import { ProfileForm } from './_profile/ProfileFormComponent';

export default async function SettingsPage() {
  const session = await getSessionUser();

  const user = await prisma.user.findUnique({
    where: { id: session.dbId },
    include: {
      stripeCustomer: {
        include: {
          tier: true,
        },
      },
    },
  });

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="flex w-full flex-col overflow-y-hidden">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-0">
        <div className="mx-auto flex w-full items-center justify-between gap-2 ">
          <H1>
            {user.name.split(' ')[0]}&apos;s Settings{' '}
            <ConditionalPlanRender
              feature={FeatureList.PremiumFeature}
              type="hidden"
            >
              🚀
            </ConditionalPlanRender>
          </H1>
          <p className="hidden text-xs text-muted-foreground md:block">
            Last change: {user.updatedAt.toLocaleDateString()}
          </p>
        </div>
        <div className="mx-auto grid w-full items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-2 text-sm text-muted-foreground">
            <Button variant={'link'} asChild className="m-0 w-fit p-0">
              <Link href="#general" className="">
                General
              </Link>
            </Button>
            <Button variant={'link'} asChild className="m-0 w-fit p-0">
              <Link href="#billing" className="w-fit">
                Billing
              </Link>
            </Button>
            <Button variant={'link'} asChild className="m-0 w-fit p-0">
              <Link href="#danger-zone" className="w-fit">
                Danger Zone
              </Link>
            </Button>
          </nav>
          <ScrollArea className="h-[80vh] w-full">
            <div className="grid gap-6 2xl:grid-cols-2">
              <div id="general" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">General</h2>
                <ProfileForm user={user} />
              </div>
              <div id="billing" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Billing</h2>
                <Card className="max-w-2xl">
                  <CardHeader>
                    <CardTitle>Manage your Billing.</CardTitle>
                    <CardDescription>
                      Here you can manage your billing!{' '}
                      <span>
                        Current plan is:{' '}
                        {user.stripeCustomer?.tier.name ?? 'Free'}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t px-6 py-4">
                    {user.stripeCustomer && user.stripeCustomer.planActive ? (
                      <PortalButton />
                    ) : (
                      <AnimatedButton asChild>
                        <Link href={'/pricing'}>Purchase Plan</Link>
                      </AnimatedButton>
                    )}
                  </CardFooter>
                </Card>
              </div>
              <div id="danger-zone" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Danger Zone</h2>
                <Card className="max-w-2xl">
                  <CardHeader>
                    <CardTitle>Delete your Account</CardTitle>
                    <CardDescription>
                      Be careful, you can not undo this action!
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="border-t px-6 py-4">
                    <DeleteAccountComponent />
                  </CardFooter>
                </Card>
              </div>
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
