import { ZodValidationPipe } from '@common/pipes';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateTodoDto, createTodoSchema } from './dto/create-todo.dto';
import { TodoDto, todoSchema } from './dto/todo.dto';
import { TodosService } from './todos.service';
import { UpdateTodoDto, updateTodoSchema } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(todoSchema.array()))
  async getTodos(): Promise<TodoDto[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async getTodo(@Param('id') id: number): Promise<TodoDto> {
    return await this.todoService.findById(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createTodoSchema))
  async createTodo(@Body() newTodo: CreateTodoDto): Promise<TodoDto> {
    return this.todoService.createTodo(newTodo);
  }

  @Patch(':id')
  async patchTodo(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(updateTodoSchema)) todo: UpdateTodoDto,
  ): Promise<TodoDto> {
    return this.todoService.patchTodo(id, todo);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTodo(@Param('id') id: number): Promise<void> {
    return this.todoService.deleteTodo(id);
  }
}
