import { z } from 'zod';
import { userDtoSchema } from './user.dto';

export const createUserDtoSchema = userDtoSchema
  .omit({ id: true })
  .merge(z.object({ password: z.string() }));

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
