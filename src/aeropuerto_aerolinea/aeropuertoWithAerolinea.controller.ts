import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AeropuertosEntity } from '../aeropuerto/aeropuertos.entity';
import { AeropuertoWithAerolineaService } from './aeropuertoWithAerolinea.service';
import { plainToInstance } from 'class-transformer';

@Controller('/AeropuertoWithAerolineaController/')
export class AeropuertoWithAerolineaController {
  constructor(
    private readonly aeropuertoWithAerolineaService: AeropuertoWithAerolineaService,
  ) {}

  @Get(':findAirportFromAirline')
  async findAirportFromAirline(@Param('id') id: string) {
    return await this.aeropuertoWithAerolineaService.findAirportFromAirline(id);
  }

  @Get(':findAirportsFromAirline')
  async findAirportsFromAirline(@Param('id') id: string) {
    return await this.aeropuertoWithAerolineaService.findAirportsFromAirline(
      id,
    );
  }

  @Post()
  async create(
    @Param('id') id: string,
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
    @Param('id') id: string,
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
