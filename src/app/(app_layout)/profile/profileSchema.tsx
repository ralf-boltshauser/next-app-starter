import { z } from 'zod';

export const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: 'The name must be at least 2 characters long.',
  }),
});
