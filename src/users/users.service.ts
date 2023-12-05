import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const createdBook = new this.userModel(createUserDto);
    return createdBook.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  findByUsername(username: string) {
    return this.userModel.findOne({ username });
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  findPhoneNumbers() {
    return this.userModel.find({ accessLevel: 'user' }).select('phone').lean();
  }
  remove(ids: string[]) {
    const objectIds = ids.map((id) => new Types.ObjectId(id));
    const stringIds = objectIds.map((objectId) => objectId.toString());
  
    return this.userModel.deleteMany({ _id: { $in: stringIds } });
  }
}
