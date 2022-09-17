import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertosEntity } from '../aeropuerto/aeropuertos.entity';
import { AerolineasEntity } from '../aerolinea/aerolineas.entity';
import { AeropuertoWithAerolineaService } from './aeropuertoWithAerolinea.service';
import { AeropuertoWithAerolineaController } from './aeropuertoWithAerolinea.controller';

@Module({
  providers: [AeropuertoWithAerolineaService],
  imports: [TypeOrmModule.forFeature([AeropuertosEntity, AerolineasEntity])],
  controllers: [AeropuertoWithAerolineaController],
})
export class AeropuertoWithAerolineaModule {}
