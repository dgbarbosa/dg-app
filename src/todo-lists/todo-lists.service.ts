/* eslint-disable @typescript-eslint/no-unused-vars */
import { TodoList as TodoListRepository } from '@entities/todo-list.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { TodoListDto } from './dto/todo-list.dto';
import { GetTodoListDto } from './dto/get-todo-list.dto';

@Injectable()
export class TodoListsService {
  constructor(
    @InjectRepository(TodoListRepository)
    private repository: Repository<TodoListRepository>,
  ) {}

  async create(
    todoList: CreateTodoListDto,
    userId: number,
  ): Promise<GetTodoListDto> {
    const { user, ...createdTodoList } = await this.repository.save({
      ...todoList,
      user: { id: userId },
    });

    return createdTodoList;
  }

  async findAll(userId: number): Promise<GetTodoListDto[]> {
    return await this.repository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: ['todos'],
    });
  }

  // async deleteTodoList(id: number): Promise<void> {
  //   const deleteResult = await this.repository.delete(id);

  //   if (deleteResult.affected === 0) {
  //     throw new NotFoundException();
  //   }
  // }

  async findById(id: number): Promise<TodoListDto> {
    const todoList = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (todoList) {
      return todoList;
    }

    throw new NotFoundException();
  }

  // async patchTodoList(
  //   id: number,
  //   todoList: TodoListDto,
  //   userId: number,
  // ): Promise<TodoListDto> {
  //   const todoListToUpdate = await this.repository.findOne({
  //     where: {
  //       id,
  //       user: {
  //         id: userId,
  //       },
  //     },
  //   });

  //   if (todoListToUpdate) {
  //     return await this.repository.save({
  //       ...todoListToUpdate,
  //       ...todoList,
  //     });
  //   }

  //   throw new NotFoundException();
  // }
}
