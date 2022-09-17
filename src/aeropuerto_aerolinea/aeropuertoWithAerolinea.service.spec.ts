import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Column, ManyToMany, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { AeropuertoWithAerolineaService } from './aeropuertoWithAerolinea.service';
import { AeropuertosEntity } from '../aeropuerto/aeropuertos.entity';
import { AerolineasEntity } from '../aerolinea/aerolineas.entity';
import { AerolineaService } from '../aerolinea/aerolinea.service';
import { AeropuertoService } from '../aeropuerto/aeropuerto.service';

describe('AeropuertoWithAerolineaService', () => {
  let service: AeropuertoWithAerolineaService;

  let aerolineaService: AerolineaService;

  let aeropuertoService: AeropuertoService;

  let repository: Repository<AeropuertosEntity>;
  let aeropuertos: AeropuertosEntity[];
  let aeropuertosEntity: AeropuertosEntity;

  let repositoryAerolinea: Repository<AerolineasEntity>;
  let aerolineas: AerolineasEntity[];
  let aerolineasEntity: AerolineasEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [
        AeropuertoWithAerolineaService,
        AerolineaService,
        AeropuertoService,
      ],
    }).compile();

    service = module.get<AeropuertoWithAerolineaService>(
      AeropuertoWithAerolineaService,
    );

    aerolineaService = module.get<AerolineaService>(AerolineaService);

    aeropuertoService = module.get<AeropuertoService>(AeropuertoService);

    repository = module.get<Repository<AeropuertosEntity>>(
      getRepositoryToken(AeropuertosEntity),
    );

    repositoryAerolinea = module.get<Repository<AerolineasEntity>>(
      getRepositoryToken(AerolineasEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    await repository.clear();
    await repositoryAerolinea.clear();

    aeropuertos = [];
    for (let i = 0; i < 5; i++) {
      const it = new AeropuertosEntity();
      it.nombre = faker.company.name();
      it.codigo = '12';
      it.pais = 57;
      it.ciudad = faker.address.city();
      aeropuertos.push(it);
    }

    aerolineas = [];
    for (let i = 0; i < 5; i++) {
      const it = new AerolineasEntity();
      it.nombre = faker.company.name();
      it.descripcion = faker.lorem.sentence();
      it.fecha = new Date();
      it.página = faker.lorem.sentence();
      aerolineas.push(it);
    }

    for (let i = 0; i < 5; i++) {
      const aeropu = aeropuertos[i];
      aeropu.aerolineas = [];
      aeropu.aerolineas.push(aerolineas[i]);
      await repository.save(aeropu);

      const aerolpu = aerolineas[i];
      aerolpu.aeropuertos = [];
      aerolpu.aeropuertos.push(aeropuertos[i]);
      await repositoryAerolinea.save(aerolpu);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('check the addAirportToAirline method', async () => {
    const it = new AeropuertosEntity();
    it.nombre = faker.company.name();
    it.codigo = '12';
    it.pais = 57;
    it.ciudad = faker.address.city();

    const allAerolineas = await aerolineaService.findAll();
    expect(allAerolineas[0].aeropuertos.length).toEqual(1);
    await service.addAirportToAirline(aerolineas[0].id, it);
    const allItem = await aerolineaService.findAll();
    expect(allItem[0].aeropuertos.length).toEqual(2);
  });

  it('check the addAirportToAirline method when the is does not exist', async () => {
    await expect(service.addAirportToAirline('21312', null)).rejects.toThrow(
      Error,
    );
  });

  it('check the findAirportsFromAirline method', async () => {
    const aero = await service.findAirportsFromAirline(aerolineas[0].id);
    expect(aero[0].nombre).toEqual(aeropuertos[0].nombre);
  });

  it('check the updateAirportsFromAirline method', async () => {
    const allAerolineas = await aerolineaService.findAll();
    expect(allAerolineas[0].aeropuertos.length).toEqual(1);
    await service.updateAirportsFromAirline(aerolineas[0].id, aeropuertos);
    const allItem = await aerolineaService.findAll();
    expect(allItem[0].aeropuertos.length).toEqual(5);
  });

  it('check the deleteAirportFromAirline method', async () => {
    const aeropuerto = await aeropuertoService.findAll();
    expect(aeropuerto.length).toEqual(5);
    await service.deleteAirportFromAirline(aerolineas[0].id);
    const allItem = await aeropuertoService.findAll();
    expect(allItem.length).toEqual(4);
  });
});
