import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstitutionsService } from './institutions.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { Types } from 'mongoose';
import { UserFromJwt } from 'auth/models/UserFromJwt';
import { CurrentUser } from 'auth/decorators/current-user.decorator';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post()
  create(@Body() createInstitutionDto: CreateInstitutionDto) {
    return this.institutionsService.create(createInstitutionDto);
  }

  @Get()
  findAll(@CurrentUser() user: UserFromJwt) {
    if (user.accessLevel === 'manager') {
      return this.institutionsService.findByUserInstitution(user.id);
    }
    return this.institutionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.institutionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstitutionDto: UpdateInstitutionDto,
  ) {
    return this.institutionsService.update(id, updateInstitutionDto);
  }

  @Delete(':id')
  remove(@Param('id') ids: string) {
    const bookIds = ids.split(',');
    const objectIds = bookIds.map((id) => new Types.ObjectId(id));

    const stringIds = objectIds.map((objectId) => objectId.toString());

    return this.institutionsService.remove(stringIds);
  }
}
