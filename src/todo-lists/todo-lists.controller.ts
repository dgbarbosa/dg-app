import { ZodValidationPipe } from '@common/pipes';
import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import {
  CreateTodoListDto,
  createTodoListDtoSchema,
} from './dto/create-todo-list.dto';
import { GetTodoListDto } from './dto/get-todo-list.dto';
import { TodoListsService } from './todo-lists.service';

@Controller('todo-lists')
export class TodoListsController {
  constructor(private todoListService: TodoListsService) {}

  @Get()
  async findAll(
    @Headers('x-user-id') userId: string,
  ): Promise<GetTodoListDto[]> {
    console.log('userId', userId);
    return await this.todoListService.findAll(+userId);
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(createTodoListDtoSchema))
    todoList: CreateTodoListDto,
    @Headers('x-user-id')
    userId: string,
  ): Promise<GetTodoListDto> {
    return await this.todoListService.create(todoList, +userId);
  }
}
