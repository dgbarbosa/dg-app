import { z } from 'zod';
import { userSchema } from './user.dto';

export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateUserDto = z.infer<typeof createUserSchema>;
