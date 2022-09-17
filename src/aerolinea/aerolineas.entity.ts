import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { AeropuertosEntity } from '../aeropuerto/aeropuertos.entity';

@Entity()
export class AerolineasEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @Column()
  página: string;

  @ManyToMany(() => AeropuertosEntity, (aeropuerto) => aeropuerto.id)
  @JoinTable()
  aeropuertos: AeropuertosEntity[];
}
