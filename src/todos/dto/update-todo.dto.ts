import { z } from 'zod';
import { todoDtoSchema } from './todo.dto';

export const updateTodoDtoSchema = todoDtoSchema
  .omit({ id: true, dueDate: true })
  .partial()
  .required({ todoList: true })
  .merge(z.object({ dueDate: z.string().optional() }))
  .refine(
    (data) => Object.keys(data).length > 0,
    'At least one field is required',
  );

export type UpdateTodoDto = z.infer<typeof updateTodoDtoSchema>;
