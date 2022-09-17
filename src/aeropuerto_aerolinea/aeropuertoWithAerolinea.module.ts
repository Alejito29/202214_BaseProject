import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertosEntity } from '../aeropuerto/aeropuertos.entity';
import { AerolineasEntity } from '../aerolinea/aerolineas.entity';
import { AeropuertoWithAerolineaService } from './aeropuertoWithAerolinea.service';

@Module({
  providers: [AeropuertoWithAerolineaService],
  imports: [TypeOrmModule.forFeature([AeropuertosEntity, AerolineasEntity])],
})
export class aeropuertoWithAerolineaModule {}
