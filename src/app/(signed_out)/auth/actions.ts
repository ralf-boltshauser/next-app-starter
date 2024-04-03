'use server';

import { prisma } from '@/lib/client';
import { sendMail } from '@/lib/mail/mail';
import { fromMail, MailTemplates } from '@/lib/mail/mail-types';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { uuidv4 } from 'uuidv7';

export async function startResetPasswordFlow(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Create a reset token
  const resetToken = uuidv4();

  // Store the reset token in the database
  await prisma.user.update({
    where: { email },
    data: { resetToken },
  });

  await sendMail({
    to: email,
    from: fromMail,
    templateId: MailTemplates.ResetPassword,
    subject: 'Reset your password',
    dynamicTemplateData: {
      resetUrl: `${process.env.NEXTAUTH_URL}/auth/reset/${resetToken}`,
    },
  });
}

export async function resetPassword(resetToken: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { resetToken },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const hash = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { resetToken },
    data: { password: hash, resetToken: null },
  });
  redirect('/auth/sign-in');
}
