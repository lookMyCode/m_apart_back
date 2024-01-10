import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();


const { JWT_SECRET } = process.env;


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [JwtModule],
})
export class SharedJwtModule {}
