import { Module } from '@nestjs/common';
import { TodoListsController } from './todo-lists.controller';
import { TodoListsService } from './todo-lists.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from '@entities/todo-list.entity';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList]), AuthModule],
  controllers: [TodoListsController],
  providers: [
    TodoListsService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [TodoListsService, TypeOrmModule],
})
export class TodoListsModule {}
