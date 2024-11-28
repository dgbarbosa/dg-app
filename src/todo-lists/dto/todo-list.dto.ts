import { z } from 'zod';

export const todoListSchema = z.object({
  id: z.number().int().positive(),
  dueDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date().nullable(),
});

export type TodoListDto = z.infer<typeof todoListSchema>;
