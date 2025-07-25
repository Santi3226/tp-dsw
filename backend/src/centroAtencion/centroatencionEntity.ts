import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Localidad } from '../localidad/localidadEntity.js';

@Entity()
export class CentroAtencion extends BaseEntity {
  @Property({ nullable: false, unique: true })
  public nombre!: string;

  @Property()
  public domicilio!: string;

  @ManyToOne(() => Localidad, { nullable: false })
  public localidad!: Localidad;

  //OnetoMany turnos
}
