import { Module } from '@nestjs/common';
import { TodoListsController } from './todo-lists.controller';
import { TodoListsService } from './todo-lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from '@entities/todo-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList])],
  controllers: [TodoListsController],
  providers: [TodoListsService],
  exports: [TodoListsService, TypeOrmModule],
})
export class TodoListsModule {}
