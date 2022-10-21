import { TimestampRecord } from "../../../database/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Customer } from './customer.entity';

@Entity()
export class User extends TimestampRecord {
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

  @Column({ type: 'varchar', length: 255 })
  password: string; //Encript required ⚠️

  //Relación 1:1 user > customer
  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true }) //nullable Propiedad null.
  @JoinColumn() //Genera el vinculo foraneo con customer
  customer: Customer;
}