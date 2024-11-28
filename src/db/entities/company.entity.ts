import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { InvoiceEntity } from './invoice.entity';

@Entity('company')
export class CompanyEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  corporateName!: string;

  @Column({ nullable: false })
  companyIdentifier!: string;

  @ManyToOne(() => UserEntity, (user) => user.companies, { nullable: true })
  user?: UserEntity;

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.serviceProvider)
  providedInvoices?: InvoiceEntity[];

  @OneToMany(() => InvoiceEntity, (invoice) => invoice.serviceRecipient)
  receivedInvoices?: InvoiceEntity[];
}
