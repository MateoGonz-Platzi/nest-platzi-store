import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Brand } from './brand.entity';

@Schema()
export class Product extends Document {

  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({type: Number, index: true})
  price: number;

  @Prop({type: Number})
  stock: number;

  @Prop()
  image: string;

  @Prop({ type: Types.ObjectId, ref: Brand.name }) // 👈 relation
  brand: Brand | Types.ObjectId; // 👈 new field
}

export const ProductSchema = SchemaFactory.createForClass(Product);