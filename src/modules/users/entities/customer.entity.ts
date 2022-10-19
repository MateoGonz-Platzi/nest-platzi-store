import { TimestampRecord } from "src/modules/timestamp.class";
import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn, 
} from "typeorm";

@Entity()
export class Customer extends TimestampRecord {
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
}