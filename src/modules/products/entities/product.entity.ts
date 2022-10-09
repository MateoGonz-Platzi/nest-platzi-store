import { 
  PrimaryGeneratedColumn, 
  Column, 
  Entity, 
  CreateDateColumn, 
  UpdateDateColumn
 } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 255, unique: true})
  name: string;

  @Column({type: 'text'}) //Standart JSON Format: text Postgres 
  description: string;

  @Column({type: 'int'})
  price: number;

  @Column({type: 'int'})
  stock: number;

  @Column({type: 'varchar'})
  image: string;

  @CreateDateColumn({
    type: "timestamptz", //Nos permite ajustar la zona horaria automáticamente
    default: () => 'CURRENT_TIMESTAMP', //Nos permite registrar el dato automáticamente
  }) 
  createdAt:Date;

  @UpdateDateColumn({
    type: "timestamptz", //Nos permite ajustar la zona horaria automáticamente
    default: () => 'CURRENT_TIMESTAMP', //Nos permite registrar el dato automáticamente
  }) 
  updatedAt:Date;
}
