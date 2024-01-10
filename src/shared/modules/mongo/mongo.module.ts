import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Apartament, ApartamentSchema } from 'src/shared/schemas/apartament.schema';
import { FileSchema, File } from 'src/shared/schemas/file.schema';
import { User, UserSchema } from 'src/shared/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Apartament.name, schema: ApartamentSchema }]),
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
  ],
  exports: [MongooseModule]
})
export class MongoModule {}
