import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AeropuertosEntity } from './aeropuertos.entity';

@Injectable()
export class AeropuertoService {
  constructor(
    @InjectRepository(AeropuertosEntity)
    private readonly aeropuertoRepository: Repository<AeropuertosEntity>,
  ) {}

  async findAll(): Promise<AeropuertosEntity[]> {
    return await this.aeropuertoRepository.find({
      relations: ['aerolineas'],
    });
  }

  async findOne(id: string): Promise<AeropuertosEntity> {
    const aerolineasEntity: AeropuertosEntity =
      await this.aeropuertoRepository.findOne({
        where: { id },
        relations: ['aerolineas'],
      });
    return aerolineasEntity;
  }

  async create(aeropuertos: AeropuertosEntity): Promise<AeropuertosEntity> {
    if (aeropuertos.codigo.length >= 3) {
      throw new Error('El codigo de la aerolineas no puede ser mayor a tees');
    }
    return await this.aeropuertoRepository.save(aeropuertos);
  }

  async update(
    id: string,
    aeropuerto: AeropuertosEntity,
  ): Promise<AeropuertosEntity> {
    if (aeropuerto.codigo.length >= 3) {
      throw new Error('El codigo de la aerolineas no puede ser mayor a tees');
    }
    await this.aeropuertoRepository.remove(aeropuerto);
    return await this.aeropuertoRepository.save(aeropuerto);
  }

  async delete(id: string) {
    const aerolinea: AeropuertosEntity =
      await this.aeropuertoRepository.findOne({ where: { id } });
    await this.aeropuertoRepository.remove(aerolinea);
  }
}
