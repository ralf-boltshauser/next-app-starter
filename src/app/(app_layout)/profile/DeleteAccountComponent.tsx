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
    signOut();
    deleteAccount();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="my-3" variant="destructive">
          Delete account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete account</DialogTitle>
          <DialogDescription>This action can not be undone!</DialogDescription>
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
