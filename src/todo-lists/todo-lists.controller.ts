import { ZodValidationPipe } from '@common/pipes';
import { User } from '@decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateTodoListDto,
  createTodoListSchema,
} from './dto/create-todo-list.dto';
import {
  UpdateTodoListDto,
  updateTodoListSchema,
} from './dto/update-todo-list.dto';
import { TodoListsService } from './todo-lists.service';
import { TodoListDto } from './dto/todo-list.dto';

@Controller('todo-lists')
export class TodoListsController {
  constructor(private todoListService: TodoListsService) {}

  @Get()
  async findAll(
    @User() user: User,
    @Query('todos', ParseBoolPipe) showTodos?: boolean,
  ): Promise<TodoListDto[]> {
    return await this.todoListService.findAll(user.id, showTodos);
  }

  @Post()
  async create(
    @User() user: User,
    @Body(new ZodValidationPipe(createTodoListSchema))
    todoList: CreateTodoListDto,
  ): Promise<TodoListDto> {
    return await this.todoListService.create(todoList, user.id);
  }

  @Patch(':id')
  async patch(
    @User() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ZodValidationPipe(updateTodoListSchema))
    todoList: UpdateTodoListDto,
  ): Promise<TodoListDto> {
    return await this.todoListService.patch(id, todoList, user.id);
  }

  @Delete(':id')
  async delete(
    @User() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    await this.todoListService.delete(id, user.id);
  }
}
