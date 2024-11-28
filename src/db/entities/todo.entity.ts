import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TodoListEntity } from './todo-list.entity';
import { UserEntity } from './user.entity';

@Entity('todo')
export class TodoEntity {
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

  @ManyToOne(() => TodoListEntity, (todoListEntity) => todoListEntity.todos, {
    nullable: true,
  })
  todoList?: TodoListEntity;

  @ManyToOne(() => UserEntity, (UserEntity) => UserEntity.todos, {
    nullable: false,
  })
  user?: UserEntity;
}
