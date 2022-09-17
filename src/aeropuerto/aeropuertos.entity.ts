import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AerolineasEntity } from '../aerolinea/aerolineas.entity';

@Entity()
export class AeropuertosEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  codigo: string;

  @Column()
  pais: number;

  @Column()
  ciudad: string;

  @ManyToMany(() => AerolineasEntity, (aerolinea) => aerolinea.id)
  @JoinTable()
  aerolineas: AerolineasEntity[];
}
