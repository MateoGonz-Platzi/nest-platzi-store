import { TimestampRecord } from "../../../database/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Customer } from './customer.entity';
import { Exclude } from "class-transformer";

@Entity()
export class User extends TimestampRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastname: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string; //Encripted

  //Relación 1:1 user > customer
  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true }) //nullable Propiedad null.
  @JoinColumn({ name: 'customer_id' }) //Genera el vinculo foraneo con customer - Se implementa naming
  customer: Customer;
}