'use client';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/passwordInput';
import { SubmitButton } from '@/components/ui/submit-button';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { resetPassword } from '../../actions';
export const resetSchema = z
  .object({
    password: z.string().min(8, {
      message: 'The password must be at least 8 characters long.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'The password must be at least 8 characters long.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function ResetForm({ resetToken }: { resetToken: string }) {
  const resetAction = resetPassword.bind(null, resetToken);
  // 1. Define your form.
  const form = useForm<z.infer<typeof resetSchema>>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof resetSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      await resetAction(values.password);
      toast.success('Password reset successfully');
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="New Password" {...field} />
              </FormControl>
              <FormDescription>Enter your new password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password Confirmation</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password Confirmation" {...field} />
              </FormControl>
              <FormDescription>Confirm your password</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <SubmitButton
            isPending={form.formState.isSubmitting}
            data-testid="reset-password-form"
          >
            Reset Password
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
