'use client';
import { AnimatedButton } from '@/components/ui/animated-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { signOut } from 'next-auth/react';
import { deleteAccount } from '../actions';

export default function DeleteAccountComponent() {
  const handleDeleteAccount = async () => {
    await deleteAccount();
    await signOut();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AnimatedButton className="my-3" variant="destructive">
          Delete Account
        </AnimatedButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action can not be
            undone!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full items-center justify-center sm:justify-start">
          <Button variant={'destructive'} onClick={handleDeleteAccount}>
            Delete account permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
