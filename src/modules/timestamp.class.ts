import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class TimestampRecord {
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