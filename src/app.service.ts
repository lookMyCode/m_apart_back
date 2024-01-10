import { RegistrationDTO } from './shared/dto/registration.dto';
import { ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './shared/schemas/user.schema';
import { Model } from 'mongoose';
import { LoginDTO } from './shared/dto/login.dto';

dotenv.config();


const { PASSWORD_SALT, PASSWORD_SALT_ROUNDS } = process.env;


@Injectable()
export class AppService {
  
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async registration(registrationDTO: RegistrationDTO) {
    const login = registrationDTO.login.toLowerCase().trim();
    const password = registrationDTO.password.trim();
    const candidate = await this.UserModel.findOne({login}).exec();
    if (candidate) {
      throw new ForbiddenException();
    }

    const saltedPassword = `${login}_${password}_${PASSWORD_SALT}`;
    const passwordHash = await bcrypt.hash(saltedPassword, +PASSWORD_SALT_ROUNDS);
    const user = new this.UserModel({
      ...registrationDTO,
      password: passwordHash,
    });

    return user.save();
  }

  async login(loginDTO: LoginDTO) {
    const login = loginDTO.login.toLowerCase().trim();
    const password = loginDTO.password.trim();
    const saltedPassword = `${login}_${password}_${PASSWORD_SALT}`;
    const user = await this.UserModel.findOne({login}).exec();
    if (!user) throw new ForbiddenException();

    const match = await bcrypt.compare(saltedPassword, user.password);
    if (!match) throw new ForbiddenException();
    return user;
  }
}
