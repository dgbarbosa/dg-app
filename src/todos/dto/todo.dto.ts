import { z } from 'zod';

export const todoSchema = z.object({
  id: z.number().positive(),
  title: z.string(),
  description: z.string().optional(),
});

export type TodoDto = z.infer<typeof todoSchema>;
