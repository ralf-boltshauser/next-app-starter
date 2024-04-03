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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fromMail } from '@/lib/mail/mail-types';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { startResetPasswordFlow } from '../actions';

export default function ErrorPage() {
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const handleEmailReset = async () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await startResetPasswordFlow(email);
      toast.success('Reset password email sent!');
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  // get query params next app router
  const errorMessage = useSearchParams().get('error');
  return (
    <div>
      <h2 className="text-2xl">Something went wrong!</h2>
      <p className="my-3">{errorMessage}</p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => window.history.back()}>
          Back
        </Button>
        <Dialog open={open} onOpenChange={(newOpen) => setOpen(newOpen)}>
          <DialogTrigger asChild>
            <AnimatedButton type="button" variant={'outline'}>
              Reset Password
            </AnimatedButton>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reset Password</DialogTitle>
              <DialogDescription>
                Enter your email below to receive a reset password link!
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={fromMail}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <AnimatedButton
                type="button"
                variant={'outline'}
                onClick={handleEmailReset}
              >
                Reset Password
              </AnimatedButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
