import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Column, ManyToMany, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AeropuertoService } from './aeropuerto.service';
import { AeropuertosEntity } from './aeropuertos.entity';

describe('AeropuertoService', () => {
  let service: AeropuertoService;
  let repository: Repository<AeropuertosEntity>;
  let aeropuertos: AeropuertosEntity[];
  let aeropuertosEntity: AeropuertosEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AeropuertoService],
    }).compile();

    service = module.get<AeropuertoService>(AeropuertoService);
    repository = module.get<Repository<AeropuertosEntity>>(
      getRepositoryToken(AeropuertosEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    aeropuertos = [];
    for (let i = 0; i < 5; i++) {
      const dto: AeropuertosEntity = await repository.save({
        nombre: faker.company.name(),
        codigo: '12',
        pais: 57,
        ciudad: 'ABC',
        aerolineas: [],
      });
      aeropuertos.push(dto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('check the findAll method', async () => {
    const itemTemporal: AeropuertosEntity = aeropuertos[0];
    const aeropuertosDTO = await service.findAll();
    expect(aeropuertosDTO).not.toBeNull();
    expect(aeropuertosDTO[0].nombre).toEqual(itemTemporal.nombre);
    expect(aeropuertosDTO[0].codigo).toEqual(itemTemporal.codigo);
  });

  it('check the findOne method', async () => {
    const itemTemporal: AeropuertosEntity = aeropuertos[0];
    const aeropuertosDTO = await service.findOne(itemTemporal.id);
    expect(aeropuertosDTO).not.toBeNull();
    expect(aeropuertosDTO.nombre).toEqual(itemTemporal.nombre);
    expect(aeropuertosDTO.codigo).toEqual(itemTemporal.codigo);
  });

  it('check the create method when the codigo is major', async () => {
    const itemTemporal: AeropuertosEntity = aeropuertos[0];
    itemTemporal.codigo = 'TESTAW';
    await expect(service.create(itemTemporal)).rejects.toThrow(Error);
  });

  it('check the create method', async () => {
    const itemTemporal: AeropuertosEntity = aeropuertos[0];
    itemTemporal.nombre = 'TE';
    const aeropuertosDTO = await service.create(itemTemporal);
    expect(aeropuertosDTO).not.toBeNull();
    expect(aeropuertosDTO.nombre).toEqual('TE');
  });

  it('check the update method', async () => {
    const itemTemporal: AeropuertosEntity = aeropuertos[0];
    itemTemporal.nombre = 'TE';
    const aeropuertosDTO = await service.update(itemTemporal.id, itemTemporal);
    expect(aeropuertosDTO).not.toBeNull();
    expect(aeropuertosDTO.nombre).toEqual('TE');
  });

  it('check the update method when the codigo is major', async () => {
    const itemTemporal: AeropuertosEntity = aeropuertos[0];
    itemTemporal.codigo = 'TESTAW';
    await expect(service.update(itemTemporal.id, itemTemporal)).rejects.toThrow(
      Error,
    );
  });

  it('check the delete method', async () => {
    const itemTemporal: AeropuertosEntity = aeropuertos[0];
    await service.delete(itemTemporal.id);
    const aeropuertosDTO = await service.findAll();
    expect(aeropuertosDTO).not.toBeNull();
    expect(aeropuertosDTO.length).toEqual(4);
  });
});
