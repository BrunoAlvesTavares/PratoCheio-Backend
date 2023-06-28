import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Types } from 'mongoose';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll().populate(['trocadoPor']);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const { email } = updateBookDto;

    // Verificar o número de reservas já feitas pelo email, se o email não for nulo
    if (email !== null) {
      const reservationsCount =
        await this.booksService.getReservationsCountByEmail(email);

      if (reservationsCount >= 3) {
        throw new HttpException(
          'Limite de reservas atingido',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.booksService.update(id, updateBookDto);
  }
  @Delete(':id')
  remove(@Param('id') ids: string) {
    const bookIds = ids.split(',');
    const objectIds = bookIds.map((id) => new Types.ObjectId(id));
    const stringIds = objectIds.map((objectId) => objectId.toString());

    return this.booksService.remove(stringIds);
  }
}
