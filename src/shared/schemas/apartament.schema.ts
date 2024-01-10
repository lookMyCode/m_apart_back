import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';


@Schema()
export class Apartament {
  @Prop({required: true})
  street: string;

  @Prop({required: true})
  houseNumber: string;

  @Prop()
  apartamentNumber: string;

  @Prop()
  postcode: string;

  @Prop({required: true})
  city: string;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'User'})
  worker: MongooseSchema.Types.ObjectId;
}

export const ApartamentSchema = SchemaFactory.createForClass(Apartament);
