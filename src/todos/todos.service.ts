import { TodoEntity } from '@entities/todo.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoListsService } from 'src/todo-lists/todo-lists.service';
import {
  FindOneOptions,
  FindOptionsWhere,
  Repository,
  SaveOptions,
} from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto, todoSchema } from './dto/todo.dto';
import { UpdateTodo } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private repository: Repository<TodoEntity>,
    private todoListsService: TodoListsService,
  ) {}

  async create(
    todo: CreateTodoDto,
    userId: number,
    options?: SaveOptions,
  ): Promise<TodoDto> {
    if (todo.todoList?.id) {
      const todoList = await this.todoListsService.findOne(
        todo.todoList.id,
        userId,
        {
          loadRelationIds: true,
        },
      );

      if (!todoList) {
        throw new NotFoundException(
          `TodoList ${todo.todoList.id} does not belong to user: ${userId}`,
        );
      }
    }

    const createdTodo = await this.repository.save(todo, options);

    return todoSchema.parse(createdTodo);
  }

  async findOne(
    id: number,
    userId: number,
    options?: FindOneOptions<TodoDto>,
  ): Promise<TodoDto> {
    const todo = await this.repository.findOne({
      ...options,
      where: {
        ...(options?.where || {}),
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!todo) {
      throw new NotFoundException('TodoDto not found');
    }

    return todoSchema.parse(todo);
  }

  async patchTodo(
    id: number,
    updateTodo: UpdateTodo,
    userId: number,
    options: FindOptionsWhere<TodoDto> = {},
  ): Promise<TodoDto> {
    await this.repository.update(
      {
        ...options,
        id,
        user: {
          id: userId,
        },
      },
      updateTodo,
    );

    const todo = await this.findOne(id, userId);

    if (todo) {
      return todoSchema.parse(todo);
    }

    throw new NotFoundException();
  }

  async delete(id: number, userId: number): Promise<void> {
    const todo = await this.findOne(id, userId, {
      loadRelationIds: true,
    });

    if (!todo) {
      throw new NotFoundException();
    }

    const result = await this.repository.delete({ id, user: { id: userId } });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
