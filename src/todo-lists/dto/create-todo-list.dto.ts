import { z } from 'zod';
import { todoListDtoSchema } from './todo-list.dto';

export const createTodoListDtoSchema = todoListDtoSchema
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    dueDate: true,
    todos: true,
  })
  .merge(z.object({ dueDate: z.string() }));

export type CreateTodoListDto = z.infer<typeof createTodoListDtoSchema>;
