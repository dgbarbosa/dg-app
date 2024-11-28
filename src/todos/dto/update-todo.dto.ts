import { z } from 'zod';
import { todoSchema } from './todo.dto';

export const updateTodoSchema = todoSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field is required',
  );

export type UpdateTodo = z.infer<typeof updateTodoSchema>;
