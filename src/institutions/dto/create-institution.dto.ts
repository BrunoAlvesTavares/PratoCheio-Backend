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

  @ApiProperty()
  description: string;

  @ApiProperty()
  establishedYear: number;

  @ApiProperty()
  contactEmail: string;

  @ApiProperty()
  website: string;

  @IsMongoId()
  @ApiProperty({ type: String })
  UserInstituition: Types.ObjectId | string | User;
}
