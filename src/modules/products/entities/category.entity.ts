import { Product } from './product.entity';
import { TimestampRecord } from "../../../database/timestamp.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends TimestampRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @ManyToMany(() => Product, (product) => product.categories, { nullable: true })
  @JoinTable({
    name: 'category_products',
    joinColumn: {
      name: 'pk_category',
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: 'pk_product',
      referencedColumnName: "id"
    }
  })
  products: Product[];
}