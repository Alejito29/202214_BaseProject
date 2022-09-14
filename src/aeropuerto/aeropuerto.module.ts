import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoEntity } from './aeropuerto.entity';
import { AeropuertoService } from './aeropuerto.service';

@Module({
  providers: [AeropuertoService],
  imports: [TypeOrmModule.forFeature([AeropuertoEntity])],
})
export class AeropuertoModule {}
