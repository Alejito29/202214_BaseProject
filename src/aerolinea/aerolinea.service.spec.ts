import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Column, ManyToMany, Repository } from 'typeorm';
import { AerolineaService } from './aerolinea.service';
import { AerolineasEntity } from './aerolineas.entity';
import { faker } from '@faker-js/faker';

describe('AerolineaService', () => {
  let service: AerolineaService;
  let repository: Repository<AerolineasEntity>;
  let aerolineas: AerolineasEntity[];
  let aerolineasEntity: AerolineasEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AerolineaService],
    }).compile();

    service = module.get<AerolineaService>(AerolineaService);
    repository = module.get<Repository<AerolineasEntity>>(
      getRepositoryToken(AerolineasEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    aerolineas = [];
    for (let i = 0; i < 5; i++) {
      const dto: AerolineasEntity = await repository.save({
        nombre: faker.company.name(),
        descripcion: faker.lorem.sentence(),
        fecha: new Date(),
        página: 'ABC',
      });
      aerolineas.push(dto);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('check the findAll method', async () => {
    const itemTemporal: AerolineasEntity = aerolineas[0];
    const aerolineasDTO = await service.findAll();
    expect(aerolineasDTO).not.toBeNull();
    expect(aerolineasDTO[0].nombre).toEqual(itemTemporal.nombre);
    expect(aerolineasDTO[0].descripcion).toEqual(itemTemporal.descripcion);
  });

  it('check the findOne method', async () => {
    const itemTemporal: AerolineasEntity = aerolineas[0];
    const aerolineasDTO = await service.findOne(itemTemporal.id);
    expect(aerolineasDTO).not.toBeNull();
    expect(aerolineasDTO.nombre).toEqual(itemTemporal.nombre);
    expect(aerolineasDTO.descripcion).toEqual(itemTemporal.descripcion);
  });

  it('check the create method', async () => {
    const itemTemporal: AerolineasEntity = aerolineas[0];
    itemTemporal.nombre = 'TEST';
    itemTemporal.fecha = new Date('2022-09-10T14:50:21.817Z');
    const aerolineasDTO = await service.create(itemTemporal);
    expect(aerolineasDTO).not.toBeNull();
    expect(aerolineasDTO.nombre).toEqual('TEST');
    expect(aerolineasDTO.descripcion).toEqual(itemTemporal.descripcion);
  });

  it('check the create method when the date is major', async () => {
    const itemTemporal: AerolineasEntity = aerolineas[0];
    itemTemporal.nombre = 'TEST';
    itemTemporal.fecha = new Date('2022-09-22T14:50:21.817Z');
    await expect(service.create(itemTemporal)).rejects.toThrow(Error);
  });

  it('check the update method when the date is major', async () => {
    const itemTemporal: AerolineasEntity = aerolineas[0];
    itemTemporal.nombre = 'TEST';
    itemTemporal.fecha = new Date('2022-09-22T14:50:21.817Z');
    await expect(service.update(itemTemporal.id, itemTemporal)).rejects.toThrow(
      Error,
    );
  });

  it('check the update method', async () => {
    const itemTemporal: AerolineasEntity = aerolineas[0];
    itemTemporal.nombre = 'TEST';
    itemTemporal.fecha = new Date('2022-09-09T14:50:21.817Z');
    const aerolineasDTO = await service.update(itemTemporal.id, itemTemporal);
    expect(aerolineasDTO).not.toBeNull();
    expect(aerolineasDTO.nombre).toEqual('TEST');
    expect(aerolineasDTO.descripcion).toEqual(itemTemporal.descripcion);
  });

  it('check the delete method', async () => {
    const itemTemporal: AerolineasEntity = aerolineas[0];
    itemTemporal.nombre = 'TEST';
    itemTemporal.fecha = new Date('2022-09-09T14:50:21.817Z');
    await service.delete(itemTemporal.id);
    const aerolineasDTO = await service.findAll();
    expect(aerolineasDTO).not.toBeNull();
    expect(aerolineasDTO.length).toEqual(4);
  });
});
