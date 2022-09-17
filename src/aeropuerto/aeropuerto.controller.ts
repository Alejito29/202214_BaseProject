import { Controller } from '@nestjs/common';
import { AeropuertosEntity } from './aeropuertos.entity';

@Controller('aeropuerto')
export class AeropuertoController {
  constructor(private readonly aerolineaService: AeropuertosEntity) {}
}
