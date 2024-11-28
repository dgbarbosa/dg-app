import { z } from 'zod';
import { todoSchema } from './todo.dto';
import { todoListSchema } from 'src/todo-lists/dto/todo-list.dto';

export const createTodoSchema = todoSchema
  .omit({
    id: true,
  })
  .merge(
    z.object({
      todoList: todoListSchema.pick({ id: true }).optional(),
    }),
  );

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
