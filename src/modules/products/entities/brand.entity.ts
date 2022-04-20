import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';
import { Document } from 'mongoose';
@Schema()
export class Brand extends Document {

  @Prop({ required: true, unique: true }) 
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);