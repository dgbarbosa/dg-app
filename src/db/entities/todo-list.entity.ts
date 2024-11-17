import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from './todo.entity';
import { User } from './user.entity';

@Entity('todoList')
export class TodoList {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dueDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.todoLists)
  user!: User;

  @OneToMany(() => Todo, (todo) => todo.todoList)
  todos!: Todo[];
}
