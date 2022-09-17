import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertosEntity } from './aeropuertos.entity';
import { AeropuertoService } from './aeropuerto.service';

@Module({
  providers: [AeropuertoService],
  imports: [TypeOrmModule.forFeature([AeropuertosEntity])],
})
export class AeropuertoModule {}
