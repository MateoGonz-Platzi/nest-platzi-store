import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({type: 'varchar', length: 255})
  name: string;

  @Column({type: 'varchar', length: 255})
  lastname: string;

  @Column({type: 'varchar'})
  email: string;

  @Column({type: 'varchar'})
  phone: string;

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