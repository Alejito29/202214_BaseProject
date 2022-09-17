import { Controller } from '@nestjs/common';
import { AerolineaService } from './aerolinea.service';

@Controller('aerolinea')
export class PaisController {
  constructor(private readonly aerolineaService: AerolineaService) {}
}
