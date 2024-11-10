import { z } from 'zod';
import { todoSchema } from './todo.dto';

export const updateTodoSchema = todoSchema.partial();

export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
