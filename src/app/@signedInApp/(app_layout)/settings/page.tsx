import Link from 'next/link';

import { AnimatedButton } from '@/components/ui/animated-button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import ConditionalTierRender from '@/components/ui/conditional-tier-render';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tiers } from '@/lib/access/access';
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
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 ">
          <h1 className="text-3xl font-semibold">
            {user.name.split(' ')[0]}&apos;s Settings{' '}
            <ConditionalTierRender tier={Tiers.Basic} type="hidden">
              🚀
            </ConditionalTierRender>
          </h1>
          <p className="hidden text-xs text-muted-foreground md:block">
            Last change: {user.updatedAt.toLocaleDateString()}
          </p>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link href="#general" className="">
              General
            </Link>
            <Link href="#billing">Billing</Link>
          </nav>
          <ScrollArea className="h-[80vh] w-full">
            <div className="grid gap-6">
              <div id="general" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">General</h2>
                <ProfileForm user={user} />
                <Card>
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
              <div id="billing" className="flex flex-col gap-4">
                <h2 className="text-xl font-semibold">Billing</h2>
                <Card>
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
            </div>
          </ScrollArea>
        </div>
      </main>
    </div>
  );
}
