import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
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

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsMongoId()
  @ApiProperty({ type: String })
  trocadoPor: Types.ObjectId | string | User;
}
