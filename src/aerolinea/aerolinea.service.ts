import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineasEntity } from './aerolineas.entity';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';

@Injectable()
export class AerolineaService {
  constructor(
    @InjectRepository(AerolineasEntity)
    private readonly aerolineaEntityEntityRepository: Repository<AerolineasEntity>,
  ) {}

  async findAll(): Promise<AerolineasEntity[]> {
    return await this.aerolineaEntityEntityRepository.find({
      relations: ['aeropuertos'],
    });
  }

  async findOne(id: string): Promise<AerolineasEntity> {
    const aerolinea: AerolineasEntity =
      await this.aerolineaEntityEntityRepository.findOne({
        where: { id },
        relations: ['aeropuertos'],
      });

    if (!aerolinea) {
      return new BusinessLogicException(
        'El id ingresado no existe',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return aerolinea;
  }

  async create(aerolineasEntity: AerolineasEntity): Promise<AerolineasEntity> {
    const systemDate = new Date();
    if (new Date(aerolineasEntity.fecha).getTime() > systemDate.getTime()) {
      return new BusinessLogicException(
        'Revise la fecha de fundacion por favor',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    return await this.aerolineaEntityEntityRepository.save(aerolineasEntity);
  }

  async update(
    id: string,
    aerolinea: AerolineasEntity,
  ): Promise<AerolineasEntity> {
    const systemDate = new Date();
    if (new Date(aerolinea.fecha).getTime() > systemDate.getTime()) {
      return new BusinessLogicException(
        'Revise la fecha de fundacion por favor',
        BusinessError.PRECONDITION_FAILED,
      );
    }
    const persistedAerolineaEntity: AerolineasEntity =
      await this.aerolineaEntityEntityRepository.findOne({ where: { id } });
    aerolinea.id = persistedAerolineaEntity.id;
    await this.aerolineaEntityEntityRepository.remove(persistedAerolineaEntity);
    return await this.aerolineaEntityEntityRepository.save(aerolinea);
  }

  async delete(id: string) {
    const aer = await this.aerolineaEntityEntityRepository.find({
      relations: ['aeropuertos'],
    });

    const aerolinea: AerolineasEntity =
      await this.aerolineaEntityEntityRepository.findOne({ where: { id } });
    await this.aerolineaEntityEntityRepository.remove(aerolinea);
  }
}
