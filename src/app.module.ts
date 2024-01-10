import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './shared/modules/mongo/mongo.module';
import * as dotenv from 'dotenv';
import { SharedJwtModule } from './shared/modules/shared-jwt/shared-jwt.module';
import { WorkersModule } from './modules/workers/workers.module';
import { ApartamentsModule } from './modules/apartaments/apartaments.module';

dotenv.config();


const {
  MONGO_PROTOCOL,
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_DB,
} = process.env;


@Module({
  imports: [
    MongooseModule.forRoot(`${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}`),
    MongoModule,
    SharedJwtModule,
    WorkersModule,
    ApartamentsModule,
  ],
  controllers: [
    AppController
  ],
  providers: [AppService],
})
export class AppModule {}
