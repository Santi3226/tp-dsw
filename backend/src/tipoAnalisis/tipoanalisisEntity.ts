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
import { Turno } from '../turno/turnoEntity.js';

@Entity()
export class TipoAnalisis extends BaseEntity {
  @Property({ nullable: false })
  public nombre!: string;

  @Property({ nullable: false })
  public importe!: number;

  @OneToMany(() => Turno, (turno) => turno.tipoAnalisis, {
    cascade: [Cascade.ALL],
  })
  turnos = new Collection<Turno>(this);

  /*
  @ManyToOne(() => PlantillaAnalisis, {
    nullable: false,
    updateRule: 'cascade',
    deleteRule: 'cascade',
  })
  plantillaAnalisis!: Rel<PlantillaAnalisis>;

  @OneToMany(() => ParametroAnalisis, (parametroAnalisis) => parametroAnalisis.tipoAnalisis, {
      cascade: [Cascade.ALL],
    })
    parametroAnalisis = new Collection<ParametroAnalisis>(this);
 */
}
