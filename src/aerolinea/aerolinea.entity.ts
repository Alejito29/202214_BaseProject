import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { AeropuertoEntity } from '../aeropuerto/aeropuerto.entity';

@Entity()
export class AerolineaEntity {
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

  @ManyToMany(() => AeropuertoEntity, (aeropuerto) => aeropuerto.id)
  aeropuerto: AeropuertoEntity[];
}
