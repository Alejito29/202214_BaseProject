import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AeropuertosEntity } from '../aeropuerto/aeropuertos.entity';
import { Repository } from 'typeorm';
import { AerolineasEntity } from '../aerolinea/aerolineas.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class AeropuertoWithAerolineaService {
  constructor(
    @InjectRepository(AeropuertosEntity)
    private readonly aeropuertoRepository: Repository<AeropuertosEntity>,

    @InjectRepository(AerolineasEntity)
    private readonly aerolineasEntity: Repository<AerolineasEntity>,
  ) {}

  async addAirportToAirline(
    id: string,
    aeropuertosEntity: AeropuertosEntity,
  ): Promise<AerolineasEntity> {
    const aerolineasEntity: AerolineasEntity =
      await this.aerolineasEntity.findOne({
        where: { id },
        relations: ['aeropuertos'],
      });

    if (!aerolineasEntity) {
      throw new Error('No existe ese id');
    }

    if (aeropuertosEntity.codigo.length >= 3) {
      throw new Error('El codigo de la aerolineas no puede ser mayor a tees');
    }
    console.log('FUE');
    await this.aeropuertoRepository.save(aeropuertosEntity);
    aerolineasEntity.aeropuertos.push(aeropuertosEntity);
    return this.aerolineasEntity.save(aerolineasEntity);
  }

  async findAirportsFromAirlines(
    id: string,
  ): Promise<Array<AeropuertosEntity>> {
    const ae = await this.aerolineasEntity.findOne({
      where: { id },
      relations: ['aeropuertos'],
    });

    if (!ae) {
      throw new Error('No existe ese id');
    }

    const items = [];
    for (let i = 0; i < ae.aeropuertos.length; i++) {
      items.push(ae.aeropuertos[i]);
    }
    return items;
  }

  async findAirportFromAirline(id: string): Promise<AeropuertosEntity> {
    const ae = await this.aerolineasEntity.findOne({
      where: { id },
      relations: ['aeropuertos'],
    });
    console.log('FUE AS', ae);
    if (!ae) {
      throw new Error(
        'No hay relacion con la aerolinea o no existe aeropuertos',
      );
    }

    return ae.aeropuertos[0];
  }

  async updateAirportsFromAirline(
    id: string,
    aeropuertos: AeropuertosEntity[],
  ): Promise<AerolineasEntity> {
    const aerolineasEntity: AerolineasEntity =
      await this.aerolineasEntity.findOne({
        where: { id },
        relations: ['aeropuertos'],
      });

    if (!aerolineasEntity) {
      throw new Error('No existe ese id');
    }

    for (let i = 0; i < aeropuertos.length; i++) {
      if (aeropuertos[i].codigo.length >= 3) {
        throw new Error('El codigo de la aerolineas no puede ser mayor a tees');
      }
    }

    for (let i = 0; i < aeropuertos.length; i++) {
      await this.aeropuertoRepository.save(aeropuertos[i]);
      aerolineasEntity.aeropuertos.push(aeropuertos[i]);
    }

    return this.aerolineasEntity.save(aerolineasEntity);
  }

  async deleteAirportFromAirline(id: string): Promise<void> {
    const aerolineasEntity: AerolineasEntity =
      await this.aerolineasEntity.findOne({
        where: { id },
        relations: ['aeropuertos'],
      });

    if (!aerolineasEntity) {
      throw new Error('No existe ese id');
    }

    for (let i = 0; i < aerolineasEntity.aeropuertos.length; i++) {
      await this.aeropuertoRepository.delete(aerolineasEntity.aeropuertos[i]);
    }
  }
}
