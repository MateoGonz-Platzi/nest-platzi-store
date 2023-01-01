import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from './customer.entity';
import { TimestampRecord } from "../../../database/timestamp.entity";
import { OrderItem } from './order-item.entity';

@Entity()
export class Order extends TimestampRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  // Implementación de relación BI-DIRECCIONAL 1:N
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];
}