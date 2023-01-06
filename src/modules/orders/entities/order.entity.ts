import { Customer } from './../../../modules/users/entities/customer.entity';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TimestampRecord } from "../../../database/timestamp.entity";
import { OrderItem } from './order-item.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
export class Order extends TimestampRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  // Implementación de relación BI-DIRECCIONAL 1:N
  @Exclude()
  @OneToMany(() => OrderItem, (item) => item.order)
  items: OrderItem[];

  @Expose()
  get products() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .map((item) => ({
          id: item.id,
          ...item.product,
          quantity: item.quantity,
        }))
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          const totalItem = item.product.price * item.quantity;
          return total + totalItem;
        }, 0);
    }
    return []
  }
}