import { z } from 'zod';
import { todoListSchema } from './todo-list.dto';

export const getTodoListSchema = todoListSchema;

export type GetTodoListDto = z.infer<typeof getTodoListSchema>;
