import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export class CreateInstitutionDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  location: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  establishedYear: number;

  @ApiProperty({ required: true })
  contactEmail: string;

  @ApiProperty({ required: true })
  website: string;

  @ApiProperty({ required: true })
  pix: string;

  @IsMongoId()
  @ApiProperty({ type: String })
  UserInstituition: Types.ObjectId | string | User;
}
