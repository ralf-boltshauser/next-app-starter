import { Button } from '@/components/ui/button';
import { authOptions } from '@/lib/auth/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import SignOutButton from './SignOutButton';

export enum SignInStatus {
  SignedIn,
  SignedOut,
  Both,
}

export interface FilteredMenuItem {
  name: string;
  href?: string;
  action?: string;
  requiresSignIn: SignInStatus;
  variant?: 'default' | 'outline';
}

export default async function MenuComponent() {
  const menuItems = [
    {
      name: 'Home',
      href: '/',
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: 'Pricing',
      href: '/#pricing',
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: 'About',
      href: '/about',
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: 'Contact',
      href: '/contact',
      requiresSignIn: SignInStatus.SignedOut,
    },
    {
      name: 'App',
      href: '/',
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: 'Settings',
      href: '/settings',
      requiresSignIn: SignInStatus.SignedIn,
    },
    {
      name: 'Sign In',
      href: '/auth/sign-in',
      requiresSignIn: SignInStatus.SignedOut,
      variant: 'default',
    },
    {
      name: 'Sign Out',
      href: '/auth/sign-out',
      action: 'signOut',
      requiresSignIn: SignInStatus.SignedIn,
    },
  ] as FilteredMenuItem[];

  const session = await getServerSession(authOptions);

  const filteredMenuItems = menuItems.filter((item) => {
    if (item.requiresSignIn === SignInStatus.Both) {
      return true;
    }
    if (item.requiresSignIn === SignInStatus.SignedIn && session) {
      return true;
    }
    if (item.requiresSignIn === SignInStatus.SignedOut && !session) {
      return true;
    }
    return false;
  });

  return (
    <>
      <div className="hidden space-x-5 md:flex">
        {filteredMenuItems.map((item, index) => {
          if (item.action === 'signOut') {
            return <SignOutButton key={item.name}>{item.name}</SignOutButton>;
          } else if (item.href) {
            return (
              <Link key={item.name} href={item.href}>
                <Button size={'sm'} variant={item.variant ?? 'link'}>
                  {item.name}
                </Button>
              </Link>
            );
          }
        })}
      </div>
      <div className="block md:hidden">
        <MobileMenu filteredMenuItems={filteredMenuItems} />
      </div>
    </>
  );
}
