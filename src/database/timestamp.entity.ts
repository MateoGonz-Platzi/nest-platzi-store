import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export class TimestampRecord {
  @CreateDateColumn({
    name: 'created_at', //Impementamos naming
    type: "timestamptz", //Nos permite ajustar la zona horaria automáticamente
    default: () => 'CURRENT_TIMESTAMP', //Nos permite registrar el dato automáticamente
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at', //Impementamos naming
    type: "timestamptz", //Nos permite ajustar la zona horaria automáticamente
    default: () => 'CURRENT_TIMESTAMP', //Nos permite registrar el dato automáticamente
  })
  updatedAt: Date;
}