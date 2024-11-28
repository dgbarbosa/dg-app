import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InvoiceEntity } from './invoice.entity';

@Entity('tax')
export class TaxEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: false })
  number!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  amount!: number;

  @Column({ nullable: false })
  reportingPeriod!: Date;

  @Column({ nullable: false })
  dueDate!: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
  rate!: number;

  @Column({ nullable: true })
  paidAt!: Date;

  @ManyToOne(() => InvoiceEntity, (invoice) => invoice.taxes, {
    nullable: false,
  })
  invoice!: InvoiceEntity;
}
