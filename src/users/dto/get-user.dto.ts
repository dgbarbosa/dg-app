import { z } from 'zod';
import { userSchema } from './user.dto';

export const getUserSchema = userSchema.omit({
  password: true,
  createdAt: true,
  updatedAt: true,
});

export type GetUserDto = z.infer<typeof getUserSchema>;
