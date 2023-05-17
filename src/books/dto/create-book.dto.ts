import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  author: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  category: string[];

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  state: string;

  @IsMongoId()
  @ApiProperty({ type: String })
  trocadoPor: Types.ObjectId | string | User;
}
