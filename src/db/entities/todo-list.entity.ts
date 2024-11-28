import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoEntity } from './todo.entity';
import { UserEntity } from './user.entity';

@Entity('todoList')
export class TodoListEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false, default: () => 'CURRENT_DATE' })
  dueDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt!: Date | null;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.todoLists, {
    nullable: false,
  })
  user?: UserEntity;

  @OneToMany(() => TodoEntity, (todoEntity) => todoEntity.todoList)
  todos?: TodoEntity[];
}
