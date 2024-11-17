import { ZodValidationPipe } from '@common/pipes';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
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
    @Headers('x-user-id') userId: string,
    @Body(new ZodValidationPipe(createTodoSchema)) newTodo: CreateTodoDto,
  ): Promise<GetTodoDto> {
    return await this.todoService.create(newTodo, +userId);
  }

  @Get(':id')
  async getTodo(
    @Headers('x-user-id') userId: string,
    @Param('id') id: number,
  ): Promise<TodoDto> {
    return await this.todoService.findOne(id, +userId);
  }

  @Patch(':id')
  async patchTodo(
    @Headers('x-user-id') userId: string,
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateTodoDtoSchema)) todo: UpdateTodoDto,
  ): Promise<TodoDto> {
    return this.todoService.patchTodo(id, todo, +userId);
  }

  @Delete(':id')
  async deleteTodo(
    @Headers('x-user-id') userId: string,
    @Param('id') id: number,
  ): Promise<void> {
    return this.todoService.deleteTodo(id, +userId);
  }
}
