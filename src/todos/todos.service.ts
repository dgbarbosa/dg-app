/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from 'src/db/entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto, todoDtoSchema } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoList } from '@entities/todo-list.entity';
import { GetTodoDto } from './dto/get-todo.dto';
import { TodoListsService } from 'src/todo-lists/todo-lists.service';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private repository: Repository<Todo>,
    private todoListsService: TodoListsService,
  ) {}
  todos: TodoDto[] = [];

  async create(todo: CreateTodoDto, userId: number): Promise<GetTodoDto> {
    const todoListId = todo.todoList.id;
    await this.validateTodoList(todoListId, userId);

    const { todoList, ...createdTodo } = await this.repository.save(todo);

    return createdTodo;
  }

  async findOne(id: number, userId: number): Promise<TodoDto> {
    const todo = await this.repository.findOne({
      where: { id },
      relations: ['todoList'],
    });

    if (!todo) {
      throw new NotFoundException();
    }

    await this.validateTodoList(todo.todoList.id, userId);

    const { todoList, ...foundTodo } = todo;
    return {
      ...foundTodo,
      todoList: {
        id: todoList.id,
      },
    };
  }

  async patchTodo(
    id: number,
    updateTodo: UpdateTodoDto,
    userId: number,
  ): Promise<TodoDto> {
    await this.validateTodoList(updateTodo.todoList.id, userId);

    await this.repository.update(id, updateTodo);

    const updatedTodo = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (updatedTodo) {
      return updatedTodo;
    }

    throw new NotFoundException();
  }

  async deleteTodo(id: number, userId: number): Promise<void> {
    const todoList = await this.todoListsService.findById(id);

    if (todoList.id !== userId) {
      throw new NotFoundException();
    }
    const result = await this.repository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }

  async validateTodoList(todoListId: number, userId: number): Promise<void> {
    const foundTodoList = await this.todoListsService.findById(todoListId);

    if (foundTodoList.user.id !== userId) {
      throw new UnauthorizedException();
    }
  }
}
