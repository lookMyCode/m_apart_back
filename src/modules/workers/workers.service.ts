import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SetWorkerDTO } from 'src/shared/dto/set-worker.dto';
import { User } from 'src/shared/schemas/user.schema';

@Injectable()
export class WorkersService {

  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  getWorkers(hint?: string) {
    return this.UserModel.find({
      role: 'worker',
      $or: [
        {
          name: {
            $regex: hint,
            $options: 'i',
          },
          surname: {
            $regex: hint,
            $options: 'i',
          },
        }
      ],
    })
    .exec();
  }

  async getWorker(id: string) {
    const worker = await this.UserModel.findById(id);
    if (!worker) throw new NotFoundException();
    return worker;
  }

  async createWorker(setWorkerDTO: SetWorkerDTO) {
    const user = new this.UserModel(setWorkerDTO);
    await user.save();

    return user;
  }

  async updateWorker(id: string, setWorkerDTO: SetWorkerDTO) {
    const user = await this.UserModel.findById(id);
    if (!user) throw new NotFoundException();

    Object.keys(setWorkerDTO).forEach(field => {
      user[field] = setWorkerDTO[field];
    });

    await user.save();
    return user;
  }

  async deleteWorker(id: string) {
    return this.UserModel.findOneAndDelete({
      _id: id,
      role: {
        $not: /^manager$/,
      },
    });
  }
}
