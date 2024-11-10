import { z } from 'zod';
import { todoSchema } from './todo.dto';

export const updateTodoSchema = todoSchema
  .omit({ id: true })
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field is required',
  );

export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
