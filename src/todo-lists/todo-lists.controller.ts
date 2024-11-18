import { ZodValidationPipe } from '@common/pipes';
import { User } from '@decorators';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  CreateTodoListDto,
  createTodoListDtoSchema,
} from './dto/create-todo-list.dto';
import { GetTodoListDto } from './dto/get-todo-list.dto';
import {
  UpdateTodoListDto,
  updateTodoListDtoSchema,
} from './dto/update-todo-list.dto';
import { TodoListsService } from './todo-lists.service';

@Controller('todo-lists')
export class TodoListsController {
  constructor(private todoListService: TodoListsService) {}

  @Get()
  async findAll(@User() user: User): Promise<GetTodoListDto[]> {
    return await this.todoListService.findAll(user.id);
  }

  @Post()
  async create(
    @User() user: User,
    @Body(new ZodValidationPipe(createTodoListDtoSchema))
    todoList: CreateTodoListDto,
  ): Promise<GetTodoListDto> {
    return await this.todoListService.create(todoList, user.id);
  }

  @Patch(':id')
  async patch(
    @User() user: User,
    @Param('id', new ParseIntPipe()) id: number,
    @Body(new ZodValidationPipe(updateTodoListDtoSchema))
    todoList: UpdateTodoListDto,
  ): Promise<GetTodoListDto> {
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
