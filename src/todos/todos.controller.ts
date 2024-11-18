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
import { CreateTodoDto, createTodoSchema } from './dto/create-todo.dto';
import { GetTodoDto } from './dto/get-todo.dto';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto, updateTodoDtoSchema } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Post()
  async create(
    @User() user: User,
    @Body(new ZodValidationPipe(createTodoSchema)) newTodo: CreateTodoDto,
  ): Promise<GetTodoDto> {
    return await this.todoService.create(newTodo, user.id);
  }

  @Get(':id')
  async getTodo(@User() user: User, @Param('id') id: number): Promise<TodoDto> {
    return await this.todoService.findOne(id, user.id);
  }

  @Patch(':id')
  async patchTodo(
    @User() user: User,
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateTodoDtoSchema)) todo: UpdateTodoDto,
  ): Promise<TodoDto> {
    return this.todoService.patchTodo(id, todo, user.id);
  }

  @Delete(':id')
  async deleteTodo(
    @User() user: User,
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<void> {
    console.log('id', id);
    return this.todoService.delete(id, user.id);
  }
}
