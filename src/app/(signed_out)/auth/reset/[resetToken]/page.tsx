import { H1 } from '@/components/design-system/headings';
import { prisma } from '@/lib/client';
import { redirect } from 'next/navigation';
import { ResetForm } from './resetForm';

export default async function ResetPasswordPage({
  params,
}: {
  params: { resetToken: string };
}) {
  const resetToken = params.resetToken;
  if (!resetToken) {
    redirect('/auth/sign-in');
  }

  const user = await prisma.user.findUnique({
    where: { resetToken },
  });

  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div>
      <H1>Password Reset</H1>
      <ResetForm resetToken={resetToken} />
    </div>
  );
}
