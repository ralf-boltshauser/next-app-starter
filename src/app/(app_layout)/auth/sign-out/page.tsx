'use client';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
export default function SignOut() {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };
  return (
    <>
      <h1>You can sign out here!</h1>
      <Button onClick={handleSignOut}>Sign out</Button>
    </>
  );
}
