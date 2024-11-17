import { z } from 'zod';
import { createTodoListDtoSchema } from './create-todo-list.dto';

export const updateTodoListDtoSchema = createTodoListDtoSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field is required',
  );

export type UpdateTodoListDto = z.infer<typeof updateTodoListDtoSchema>;
