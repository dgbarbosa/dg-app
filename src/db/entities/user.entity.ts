import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoListEntity } from './todo-list.entity';
import { TodoEntity } from './todo.entity';
import { CompanyEntity } from './company.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column({})
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => TodoListEntity, (todoListEntity) => todoListEntity.user, {
    nullable: true,
  })
  todoLists?: TodoListEntity[];

  @OneToMany(() => TodoEntity, (todoEntity) => todoEntity.user, {
    nullable: true,
  })
  todos?: TodoEntity[];

  @OneToMany(() => CompanyEntity, (company) => company.user)
  companies?: CompanyEntity[];
}
