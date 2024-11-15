import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'todo' })
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;
}
