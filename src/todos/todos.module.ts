import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from 'src/db/entities/todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { TodoListsModule } from 'src/todo-lists/todo-lists.module';

@Module({
  imports: [TypeOrmModule.forFeature([Todo]), TodoListsModule],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
