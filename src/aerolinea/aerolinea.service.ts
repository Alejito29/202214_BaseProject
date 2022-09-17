import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AerolineasEntity } from './aerolineas.entity';

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
    const cultura: AerolineasEntity =
      await this.aerolineaEntityEntityRepository.findOne({
        where: { id },
        relations: ['aeropuertos'],
      });
    return cultura;
  }

  async create(aerolineasEntity: AerolineasEntity): Promise<AerolineasEntity> {
    const systemDate = new Date();
    if (aerolineasEntity.fecha > systemDate) {
      throw new Error('Revise la fecha de fundacion por favor');
    }
    return await this.aerolineaEntityEntityRepository.save(aerolineasEntity);
  }

  async update(
    id: string,
    aerolinea: AerolineasEntity,
  ): Promise<AerolineasEntity> {
    const systemDate = new Date();
    if (aerolinea.fecha > systemDate) {
      throw new Error('Revise la fecha de fundacion por favor');
    }
    const persistedAerolineaEntity: AerolineasEntity =
      await this.aerolineaEntityEntityRepository.findOne({ where: { id } });
    aerolinea.id = persistedAerolineaEntity.id;
    await this.aerolineaEntityEntityRepository.remove(persistedAerolineaEntity);
    return await this.aerolineaEntityEntityRepository.save(aerolinea);
  }

  async delete(id: string) {
    const aerolinea: AerolineasEntity =
      await this.aerolineaEntityEntityRepository.findOne({ where: { id } });
    await this.aerolineaEntityEntityRepository.remove(aerolinea);
  }
}
