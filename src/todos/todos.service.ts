import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/db/entities/todo.entity';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoDto, todoSchema } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}
  todos: TodoDto[] = [];

  async createTodo(todo: CreateTodoDto): Promise<TodoDto> {
    const createdTodo = await this.todoRepository.save(todo);

    return todoSchema.parse(createdTodo);
  }

  async findAll(): Promise<TodoDto[]> {
    const result = await this.todoRepository.find();
    return result as TodoDto[];
  }

  async findById(id: number): Promise<TodoDto> {
    const todo = await this.todoRepository.findOne({
      where: { id: id },
    });

    if (todo) {
      return todoSchema.parse(todo);
    }

    throw new NotFoundException();
  }

  async patchTodo(id: number, todo: UpdateTodoDto): Promise<TodoDto> {
    const result = await this.todoRepository.update(id, todo);

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    const updatedTodo = await this.todoRepository.findOne({
      where: { id: id },
    });

    return todoSchema.parse(updatedTodo);
  }

  async deleteTodo(id: number): Promise<void> {
    const result = await this.todoRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }
  }
}
