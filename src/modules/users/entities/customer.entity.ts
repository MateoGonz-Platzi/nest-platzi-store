import { TimestampRecord } from "../../../database/timestamp.entity";
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Order } from "./order.entity";

@Entity()
export class Customer extends TimestampRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @OneToOne(() => User, (user) => user.customer)
  user: User;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}