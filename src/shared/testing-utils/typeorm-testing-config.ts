import { TypeOrmModule } from '@nestjs/typeorm';
import { AerolineasEntity } from '../../aerolinea/aerolineas.entity';
import { AeropuertosEntity } from '../../aeropuerto/aeropuertos.entity';

export const TypeOrmTestingConfig = () => [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [AerolineasEntity, AeropuertosEntity],
    synchronize: true,
    keepConnectionAlive: true,
  }),
  TypeOrmModule.forFeature([AerolineasEntity, AeropuertosEntity]),
];
