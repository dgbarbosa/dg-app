import { z } from 'zod';

export const userSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserDto = z.infer<typeof userSchema>;
