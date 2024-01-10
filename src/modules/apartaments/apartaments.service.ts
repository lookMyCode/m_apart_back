import { SetApartamentDTO } from './../../shared/dto/set-apartament.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Apartament } from 'src/shared/schemas/apartament.schema';
import { File } from 'src/shared/schemas/file.schema';

@Injectable()
export class ApartamentsService {

  constructor(
    @InjectModel(Apartament.name) private ApartamentModel: Model<Apartament>,
    @InjectModel(File.name) private FileModel: Model<File>
  ) {}

  getApartaments(hint?: string) {
    return this.ApartamentModel.find({
      street: {
        $regex: hint,
        $options: 'i',
      },
    }).exec();
  }

  async getApartament(id: string) {
    const apartament: any = await this.ApartamentModel.findById(id).lean().exec();
    if (!apartament) throw new NotFoundException();

    const files = await this.FileModel.find({apartament: id}).lean().exec();
    apartament.files = files;;
    return apartament;
  }

  async createApartament(setApartamentDTO: SetApartamentDTO) {
    const apartament = new this.ApartamentModel({
      ...setApartamentDTO,
    });
    await apartament.save();
    return apartament;
  }

  async updateApartament(id: string, setApartamentDTO: SetApartamentDTO) {
    const apartament = await this.ApartamentModel.findById(id);
    if (!apartament) throw new NotFoundException();

    Object.keys(setApartamentDTO).forEach(field => {
      apartament[field] = setApartamentDTO[field];
    });

    await apartament.save();
    return apartament;
  }

  async deleteApartament(id: string) {
    const apartament = await this.ApartamentModel.findByIdAndDelete(id);
    await this.FileModel.deleteMany({
      apartament: id,
    });

    return apartament;
  }

  async saveFile(id: string, fileName: string) {
    const file = new this.FileModel({
      fileName,
      apartament: id,
    });
    await file.save();
    return file;
  }
}
