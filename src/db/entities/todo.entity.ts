import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoList } from './todo-list.entity';
import { User } from './user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false, default: () => 'CURRENT_DATE' })
  dueDate!: Date;

  @Column({ default: false })
  isCompleted!: boolean;

  @ManyToOne(() => TodoList, (todoList) => todoList.todos, { nullable: true })
  todoList!: TodoList;

  @ManyToOne(() => User, (user) => user.todos, { nullable: false })
  user!: User;
}
