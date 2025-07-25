import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { CentroAtencion } from '../centroAtencion/centroatencionEntity.js';

@Entity()
export class Localidad extends BaseEntity {
  @Property({ nullable: false, unique: true })
  public denominacion!: string;

  @Property()
  public codPostal!: string;
}
