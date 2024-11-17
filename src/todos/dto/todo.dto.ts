import { z } from 'zod';

export const todoDtoSchema = z.object({
  id: z.number().positive(),
  title: z.string(),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  isCompleted: z.boolean(),
  todoList: z.object({
    id: z.number().int().positive(),
  }),
});

export type TodoDto = z.infer<typeof todoDtoSchema>;
