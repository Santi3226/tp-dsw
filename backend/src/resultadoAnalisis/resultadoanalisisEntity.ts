import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { ParametroAnalisis } from '../parametroAnalisis/parametroanalisisEntity.js';

@Entity()
export class ResultadoAnalisis extends BaseEntity {
  @Property({ nullable: false})
  public valor!: number;

  @OneToMany(() => ParametroAnalisis, (parametroAnalisis) => parametroAnalisis.resultadoAnalisis, {
    cascade: [Cascade.ALL],
  })
  parametroAnalisis = new Collection<ParametroAnalisis>(this);
}
