/* eslint-disable @typescript-eslint/no-unused-vars */
import { TodoListEntity } from '@entities/todo-list.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { TodoListDto, todoListSchema } from './dto/todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';

@Injectable()
export class TodoListsService {
  constructor(
    @InjectRepository(TodoListEntity)
    private repository: Repository<TodoListEntity>,
  ) {}

  async create(
    todoList: CreateTodoListDto,
    userId: number,
  ): Promise<TodoListDto> {
    const { user, ...createdTodoList } = await this.repository.save({
      ...todoList,
      user: { id: userId },
    });

    return createdTodoList;
  }

  async findAll(userId: number, showTodos?: boolean): Promise<TodoListDto[]> {
    const relations = [];

    if (showTodos) {
      relations.push('todos');
    }

    const lists = await this.repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations,
    });

    return todoListSchema.array().parse(lists);
  }

  async delete(id: number, userId: number): Promise<void> {
    const todoList = await this.repository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!todoList) {
      throw new NotFoundException();
    }

    const deleteResult = await this.repository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException();
    }
  }

  async findOne(
    id: number,
    userId: number,
    options: FindOneOptions<TodoListDto> = {},
  ): Promise<TodoListDto> {
    const todoList = await this.repository.findOne({
      ...options,
      where: {
        ...(options?.where || {}),
        id,
        user: {
          id: userId,
        },
      },
    });

    if (!todoList) {
      throw new NotFoundException('TodoList not found');
    }

    return todoListSchema.parse(todoList);
  }

  async patch(
    id: number,
    todoList: UpdateTodoListDto,
    userId: number,
  ): Promise<TodoListDto> {
    const todoListToUpdate = await this.repository.findOne({
      where: {
        id,
        user: {
          id: userId,
        },
      },
    });

    if (todoListToUpdate) {
      return await this.repository.save({
        ...todoListToUpdate,
        ...todoList,
      });
    }

    throw new NotFoundException();
  }
}
