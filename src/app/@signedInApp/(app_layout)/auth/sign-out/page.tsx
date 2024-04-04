'use client';
import { H1 } from '@/components/design-system/headings';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
export default function SignOut() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <>
      <H1>You can sign out here!</H1>
      <Button onClick={handleSignOut}>Sign out</Button>
    </>
  );
}
