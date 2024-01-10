import { Module } from '@nestjs/common';
import { ApartamentsController } from './apartaments.controller';
import { ApartamentsService } from './apartaments.service';
import { MongoModule } from 'src/shared/modules/mongo/mongo.module';

@Module({
  controllers: [ApartamentsController],
  providers: [ApartamentsService],
  imports: [
    MongoModule,
  ],
})
export class ApartamentsModule {}
