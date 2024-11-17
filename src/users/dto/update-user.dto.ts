import { z } from 'zod';
import { createUserDtoSchema } from './create-user.dto';

export const updateUserDtoSchema = createUserDtoSchema
  .omit({ email: true })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field is required',
  );

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
