import { TimestampRecord } from "src/modules/timestamp.class";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends TimestampRecord {
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

  @Column({type: 'varchar', length: 255})
  password: string; //Encript required ⚠️
}