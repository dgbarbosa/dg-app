import { z } from 'zod';
import { todoListDtoSchema } from './todo-list.dto';

export const getTodoListDto = todoListDtoSchema.omit({ user: true });

export type GetTodoListDto = z.infer<typeof getTodoListDto>;
