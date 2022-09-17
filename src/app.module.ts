import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineaModule } from './aerolinea/aerolinea.module';
import { AeropuertoModule } from './aeropuerto/aeropuerto.module';
import { AeropuertoWithAerolineaModule } from './aeropuerto_aerolinea/aeropuertoWithAerolinea.module';
import { AerolineasEntity } from './aerolinea/aerolineas.entity';
import { AeropuertosEntity } from './aeropuerto/aeropuertos.entity';
@Module({
  imports: [
    AerolineaModule,
    AeropuertoModule,
    AeropuertoWithAerolineaModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [AerolineasEntity, AeropuertosEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
