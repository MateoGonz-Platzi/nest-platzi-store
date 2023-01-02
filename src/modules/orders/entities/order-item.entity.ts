import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampRecord } from "../../../database/timestamp.entity";
import { Product } from '../../products/entities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrderItem extends TimestampRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product)
  product: Product;

  // Implementación de relación BI-DIRECCIONAL N:1
  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}