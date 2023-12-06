import { PartialType } from '@nestjs/swagger';
import { CreateMessagehistoryDto } from './create-messagehistory.dto';

export class UpdateMessagehistoryDto extends PartialType(
  CreateMessagehistoryDto,
) {}
