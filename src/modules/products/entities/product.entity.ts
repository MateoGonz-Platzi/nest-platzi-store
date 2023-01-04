import { TimestampRecord } from '../../../database/timestamp.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  ManyToMany,
  Index,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';
@Entity()
@Index(['price', 'stock']) //Indexación de un conjunto
export class Product extends TimestampRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'text' }) //Standart JSON Format: text Postgres 
  description: string;

  @Index() //Indexación por un elemento
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar' })
  image: string;

  @ManyToOne(() => Brand, (brand) => brand.products)
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products, { nullable: true })
  categories: Category[];
}
