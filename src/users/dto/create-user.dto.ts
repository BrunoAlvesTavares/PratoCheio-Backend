import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ uniqueItems: true })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ required: true })
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    enum: ['admin', 'user'],
  })
  accessLevel: string;
}
