import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ type: 'string', required: true })
  email: string;

  @Prop({ type: 'string', required: true })
  phone: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);