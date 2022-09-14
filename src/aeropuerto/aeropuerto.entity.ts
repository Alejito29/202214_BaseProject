import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AerolineaEntity } from '../aerolinea/aerolinea.entity';

@Entity()
export class AeropuertoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  código: number;

  @Column()
  país: number;

  @Column()
  ciudad: string;

  @ManyToMany(() => AerolineaEntity, (aerolinea) => aerolinea.id)
  aerolineaEntity: AerolineaEntity[];
}
