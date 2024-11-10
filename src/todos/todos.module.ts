import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from 'src/db/entities/todo.entity';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  providers: [TodosService],
  controllers: [TodosController],
})
export class TodosModule {}
