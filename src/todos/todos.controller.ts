import { ZodValidationPipe } from '@common/pipes';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { CreateTodoDto, createTodoSchema } from './dto/create-todo.dto';
import { TodoDto, todoSchema } from './dto/todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private todoService: TodosService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(todoSchema.array()))
  getTodos(): TodoDto[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  getTodo(@Param('id') id: string): TodoDto {
    return this.todoService.findById(id);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createTodoSchema))
  createTodo(@Body() newTodo: CreateTodoDto): TodoDto {
    return this.todoService.createTodo(newTodo);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): void {
    this.todoService.findById(id);
  }
}
