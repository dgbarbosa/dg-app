import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  todos: TodoDto[] = [];

  createTodo(todo: CreateTodoDto): TodoDto {
    const newTodo = { id: crypto.randomUUID(), ...todo };
    this.todos.push(newTodo);

    return newTodo;
  }

  findAll(): TodoDto[] {
    return this.todos;
  }

  findById(id: string): TodoDto {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new NotFoundException();
    }

    return todo;
  }

  deleteTodo(id: string): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
