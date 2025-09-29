import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { TipoAnalisis } from '../tipoAnalisis/tipoanalisisEntity.js';

@Entity()
export class PlantillaAnalisis extends BaseEntity {
  @Property({ nullable: false })
  public hsAyuno!: string;

  @Property({ nullable: false })
  public preparacion!: string;

  @Property({ nullable: false })
  public tiempoPrevisto!: number;

  @Property({ nullable: false })
  public fechaDesde!: Date;

  @OneToMany(
    () => TipoAnalisis,
    (tipoAnalisis) => tipoAnalisis.plantillaAnalisis,
    {
      cascade: [Cascade.ALL],
    }
  )
  tipoAnalisis = new Collection<TipoAnalisis>(this);
}
