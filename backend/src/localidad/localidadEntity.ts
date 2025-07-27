import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { CentroAtencion } from '../centroAtencion/centroatencionEntity.js';

@Entity()
export class Localidad extends BaseEntity {
  @Property({ nullable: false })
  public denominacion!: string;

  @Property({ nullable: false})
  public codPostal!: string;

  @OneToMany(() => CentroAtencion, (centroAtencion) => centroAtencion.localidad, {
    cascade: [Cascade.ALL],
  })
  centroAtencion = new Collection<CentroAtencion>(this);
}
