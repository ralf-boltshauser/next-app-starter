'use client';
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
import { deleteAccount } from './actions';

export default function DeleteAccountComponent() {
  const handleDeleteAccount = async () => {
    await signOut();
    await deleteAccount();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="my-3" variant="destructive">
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Account</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your account? This action can not be
            undone!
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center w-full items-center sm:justify-start">
          <Button variant={'destructive'} onClick={handleDeleteAccount}>
            Delete account permanently
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
