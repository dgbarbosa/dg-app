import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CompanyEntity } from './company.entity';
import { TaxEntity } from './tax.entity';

@Entity('invoice')
export class InvoiceEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  number!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount!: number;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'timestamp', nullable: false })
  issuedAt!: Date;

  @Column({ nullable: false, unique: true })
  verificationCode!: string;

  @OneToMany(() => TaxEntity, (tax) => tax.invoice)
  taxes?: TaxEntity[];

  @ManyToOne(() => CompanyEntity, (company) => company.providedInvoices, {
    nullable: false,
  })
  serviceProvider!: CompanyEntity;

  @ManyToOne(() => CompanyEntity, (company) => company.receivedInvoices, {
    nullable: false,
  })
  serviceRecipient!: CompanyEntity;
}
