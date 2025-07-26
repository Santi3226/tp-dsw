import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { CentroAtencion } from '../centroAtencion/centroatencionEntity.js';

@Entity()
export class Localidad extends BaseEntity {
  @Property({ nullable: false, unique: true })
  public denominacion!: string;

  @Property()
  public codPostal!: string;

  @OneToMany(() => CentroAtencion, (centro) => centro.localidad, {
    cascade: [Cascade.ALL],
  })
  centros = new Collection<CentroAtencion>(this);
}
