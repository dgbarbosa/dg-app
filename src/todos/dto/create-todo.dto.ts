import { z } from 'zod';
import { todoSchema } from './todo.dto';

export const createTodoSchema = todoSchema.omit({ id: true });

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
