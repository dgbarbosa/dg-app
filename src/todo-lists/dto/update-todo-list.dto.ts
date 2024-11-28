import { z } from 'zod';
import { createTodoListSchema } from './create-todo-list.dto';

export const updateTodoListSchema = createTodoListSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field is required',
  );

export type UpdateTodoListDto = z.infer<typeof updateTodoListSchema>;
