import { TimestampRecord } from '../../../database/timestamp.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
} from 'typeorm';

@Entity()
export class Product extends TimestampRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' }) //Standart JSON Format: text Postgres 
  description: string;

  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;
}
