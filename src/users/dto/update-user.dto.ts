import { z } from 'zod';
import { createUserSchema } from './create-user.dto';

export const updateUserSchema = createUserSchema
  .omit({ email: true })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field is required',
  );

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
