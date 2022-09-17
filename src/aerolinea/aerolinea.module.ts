import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineasEntity } from './aerolineas.entity';
import { AerolineaService } from './aerolinea.service';

@Module({
  providers: [AerolineaService],
  imports: [TypeOrmModule.forFeature([AerolineasEntity])],
})
export class AerolineaModule {}
