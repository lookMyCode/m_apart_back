import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(port, () => {
    console.log(`Application was started on the port ${port}`);
  });
}
bootstrap();
