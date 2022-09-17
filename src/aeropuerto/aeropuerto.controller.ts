import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AeropuertosEntity } from './aeropuertos.entity';
import { plainToInstance } from 'class-transformer';
import { AeropuertoService } from './aeropuerto.service';

@Controller('airports')
export class AeropuertoController {
  constructor(private readonly aeropuertosEntity: AeropuertoService) {}

  @Get()
  async findAll() {
    return await this.aeropuertosEntity.findAll();
  }

  @Get(':id')
  async findOne(@Query('id') id: string) {
    return await this.aeropuertosEntity.findOne(id);
  }

  @Post()
  async create(@Body() aeropuertos: AeropuertosEntity) {
    const aeropuerto: AeropuertosEntity = plainToInstance(
      AeropuertosEntity,
      aeropuertos,
    );
    return await this.aeropuertosEntity.create(aeropuerto);
  }

  @Put(':id')
  async update(@Query('id') id: string, @Body() aeropuerto: AeropuertosEntity) {
    const aeropuertos: AeropuertosEntity = plainToInstance(
      AeropuertosEntity,
      aeropuerto,
    );
    return await this.aeropuertosEntity.update(id, aeropuertos);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Query('id') id: string) {
    return await this.aeropuertosEntity.delete(id);
  }
}
