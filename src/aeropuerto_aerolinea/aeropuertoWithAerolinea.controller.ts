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
import { AeropuertosEntity } from '../aeropuerto/aeropuertos.entity';
import { AeropuertoWithAerolineaService } from './aeropuertoWithAerolinea.service';
import { plainToInstance } from 'class-transformer';

@Controller('AeropuertoWithAerolineaController')
export class AeropuertoWithAerolineaController {
  constructor(
    private readonly aeropuertoWithAerolineaService: AeropuertoWithAerolineaService,
  ) {}

  @Get(':id')
  async findAirportFromAirline(@Query('id') id: string) {
    console.log('FUE');
    return await this.aeropuertoWithAerolineaService.findAirportFromAirline(id);
  }

  @Get(':findAirportsFromAirline')
  async findAirportsFromAirline(@Query('id') id: string) {
    return await this.aeropuertoWithAerolineaService.findAirportsFromAirlines(
      id,
    );
  }

  @Post()
  async create(
    @Query('id') id: string,
    @Body() aeropuertos: AeropuertosEntity,
  ) {
    const aeropuerto: AeropuertosEntity = plainToInstance(
      AeropuertosEntity,
      aeropuertos,
    );
    return await this.aeropuertoWithAerolineaService.addAirportToAirline(
      id,
      aeropuerto,
    );
  }

  @Put(':updateAirportsFromAirline')
  async update(
    @Query('id') id: string,
    @Body() aeropuerto: [AeropuertosEntity],
  ) {
    return await this.aeropuertoWithAerolineaService.updateAirportsFromAirline(
      id,
      aeropuerto,
    );
  }

  @Delete(':deleteAirportFromAirline')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    return await this.aeropuertoWithAerolineaService.deleteAirportFromAirline(
      id,
    );
  }
}
