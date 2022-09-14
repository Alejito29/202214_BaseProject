import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaEntity } from './aerolinea.entity';
import { AerolineaService } from './aerolinea.service';

@Module({
  providers: [AerolineaService],
  imports: [TypeOrmModule.forFeature([AerolineaEntity])],
})
export class AerolineaModule {}
