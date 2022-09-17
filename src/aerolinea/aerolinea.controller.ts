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
import { AerolineaService } from './aerolinea.service';
import { AerolineasEntity } from './aerolineas.entity';
import { plainToInstance } from 'class-transformer';

@Controller('airlines')
export class AerolineaController {
  constructor(private readonly aerolineaService: AerolineaService) {}

  @Get()
  async findAll() {
    return await this.aerolineaService.findAll();
  }

  @Get(':id')
  async findOne(@Query('id') id: string) {
    return await this.aerolineaService.findOne(id);
  }
  @Post()
  async create(@Body() aerolineasEntity: AerolineasEntity) {
    const aerolinea: AerolineasEntity = plainToInstance(
      AerolineasEntity,
      aerolineasEntity,
    );
    return await this.aerolineaService.create(aerolinea);
  }

  @Put(':id')
  async update(
    @Query('id') id: string,
    @Body() aerolineasEntity: AerolineasEntity,
  ) {
    const aerolinea: AerolineasEntity = plainToInstance(
      AerolineasEntity,
      aerolineasEntity,
    );
    return await this.aerolineaService.update(id, aerolinea);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Query('id') id: string) {
    return await this.aerolineaService.delete(id);
  }
}
