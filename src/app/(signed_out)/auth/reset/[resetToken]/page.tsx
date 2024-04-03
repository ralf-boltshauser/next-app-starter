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
      <h2 className="text-3xl font-semibold">Password Reset</h2>
      <ResetForm resetToken={resetToken} />
    </div>
  );
}
