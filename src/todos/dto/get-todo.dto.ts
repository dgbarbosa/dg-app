import { z } from 'zod';
import { todoDtoSchema } from './todo.dto';

export const getTodoSchema = todoDtoSchema.omit({ todoList: true });

export type GetTodoDto = z.infer<typeof getTodoSchema>;
