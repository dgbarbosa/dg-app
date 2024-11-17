import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoList } from './todo-list.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  dueDate!: Date;

  @Column()
  isCompleted!: boolean;

  @ManyToOne(() => TodoList, (todoList) => todoList.todos)
  todoList!: TodoList;
}
