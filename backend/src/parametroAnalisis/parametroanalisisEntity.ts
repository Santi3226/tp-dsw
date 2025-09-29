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
import { TipoAnalisis } from '../tipoAnalisis/tipoanalisisEntity.js';
import { ResultadoAnalisis } from '../resultadoAnalisis/resultadoanalisisEntity.js';

@Entity()
export class ParametroAnalisis extends BaseEntity {
  @Property({ nullable: false })
  public nombre!: string;

  @Property({ nullable: false })
  public referencia!: string;

  @Property({ nullable: false })
  public unidad!: string;

  @OneToMany(
    () => ResultadoAnalisis,
    (resultadoAnalisis) => resultadoAnalisis.parametroAnalisis,
    {
      cascade: [Cascade.ALL],
    }
  )
  resultadoAnalisis = new Collection<ResultadoAnalisis>(this);
}
