import { todoDtoSchema } from 'src/todos/dto/todo.dto';
import { z } from 'zod';

export const todoListDtoSchema = z.object({
  id: z.number().int().positive(),
  dueDate: z.date(),
  createdAt: z.date(),
  updatedAt: z.date(),
  user: z.object({
    id: z.number().int().positive(),
  }),
  todos: todoDtoSchema.array().optional(),
});

export type TodoListDto = z.infer<typeof todoListDtoSchema>;
