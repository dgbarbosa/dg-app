import { z } from 'zod';
import { userDtoSchema } from './user.dto';

export const getUserDtoSchema = userDtoSchema.omit({
  password: true,
});

export type GetUserDto = z.infer<typeof getUserDtoSchema>;
