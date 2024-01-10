import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';


@Schema({ timestamps: true })
export class File {
  @Prop({required: true})
  fileName: string;

  @Prop({type: MongooseSchema.Types.ObjectId, ref: 'Apartament'})
  apartament: MongooseSchema.Types.ObjectId
}

export const FileSchema = SchemaFactory.createForClass(File);
