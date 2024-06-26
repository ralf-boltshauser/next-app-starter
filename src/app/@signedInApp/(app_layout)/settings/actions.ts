'use server';

import { getSessionUser } from '@/lib/auth/auth';
import { prisma } from '@/lib/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { profileFormSchema } from './_profile/profileSchema';

export async function updateProfile(values: z.infer<typeof profileFormSchema>) {
  const payload = profileFormSchema.safeParse(values);
  if (!payload.success) {
    return {
      error: payload.error.errors,
    };
  }

  const user = await getSessionUser();

  await prisma.user.update({
    where: { id: user.dbId },
    data: {
      name: payload.data.name,
    },
  });

  revalidatePath('/profile');
  return {
    error: [],
  };
}

export async function deleteAccount() {
  const user = await getSessionUser();
  await prisma.user.delete({ where: { id: user.dbId } });
}
