import { Module } from '@nestjs/common';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';
import { MongoModule } from 'src/shared/modules/mongo/mongo.module';

@Module({
  controllers: [WorkersController],
  providers: [WorkersService],
  imports: [
    MongoModule,
  ],
})
export class WorkersModule {}
