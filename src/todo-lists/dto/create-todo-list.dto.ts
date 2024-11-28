import { z } from 'zod';
import { todoListSchema } from './todo-list.dto';

export const createTodoListSchema = todoListSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    dueDate: true,
  })
  .merge(z.object({ dueDate: z.string() }));

export type CreateTodoListDto = z.infer<typeof createTodoListSchema>;
