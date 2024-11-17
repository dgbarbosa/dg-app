import { z } from 'zod';

export const userDtoSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export type UserDto = z.infer<typeof userDtoSchema>;
