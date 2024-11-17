import { z } from 'zod';
import { todoDtoSchema } from './todo.dto';
import { todoListDtoSchema } from 'src/todo-lists/dto/todo-list.dto';

export const createTodoSchema = todoDtoSchema
  .omit({ id: true, dueDate: true })
  .merge(
    z.object({
      todoList: todoListDtoSchema.pick({ id: true }),
      dueDate: z.string().optional(),
    }),
  );

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
