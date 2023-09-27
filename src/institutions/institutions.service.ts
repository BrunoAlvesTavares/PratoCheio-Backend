import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  Institution,
  InstitutionDocument,
} from './entities/institution.entity';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';

@Injectable()
export class InstitutionsService {
  constructor(
    @InjectModel(Institution.name)
    private institutionModel: Model<InstitutionDocument>,
  ) {}

  create(createInstitutionDto: CreateInstitutionDto) {
    const createdBook = new this.institutionModel(createInstitutionDto);
    return createdBook.save();
  }

  findAll() {
    return this.institutionModel.find();
  }

  async findByUserInstitution(userId: string) {
    return this.institutionModel.find({ UserInstituition: userId }).exec();
  }

  findOne(id: string) {
    return this.institutionModel.findById(id);
  }

  update(id: string, updateInstitutionDto: UpdateInstitutionDto) {
    return this.institutionModel.findByIdAndUpdate(id, updateInstitutionDto);
  }

  remove(ids: string[]) {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const stringIds = objectIds.map((objectId) => objectId.toString());

    return this.institutionModel.deleteMany({ _id: { $in: stringIds } });
  }
}
