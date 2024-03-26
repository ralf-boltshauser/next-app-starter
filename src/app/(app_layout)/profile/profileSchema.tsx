import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z.string().min(3, {
    message: 'Name is a required field.',
  }),
});
