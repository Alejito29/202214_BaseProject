import { Controller } from '@nestjs/common';
import { AeropuertosEntity } from '../aeropuerto/aeropuertos.entity';

@Controller('aeropuerto')
export class AeropuertoWithAerolineaController {
  constructor(private readonly aerolineaService: AeropuertosEntity) {}
}
