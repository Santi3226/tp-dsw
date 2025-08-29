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
import { PlantillaAnalisis } from '../plantillaAnalisis/plantillaanalisisEntity.js';
import { ParametroAnalisis } from '../parametroAnalisis/parametroanalisisEntity.js';
import { ResultadoAnalisis } from '../resultadoAnalisis/resultadoanalisisEntity.js';

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

  @ManyToOne(() => PlantillaAnalisis, {
    nullable: false,
    updateRule: 'cascade',
    deleteRule: 'cascade',
  })
  plantillaAnalisis!: Rel<PlantillaAnalisis>;

  @OneToMany(
    () => ResultadoAnalisis,
    (resultadoAnalisis) => resultadoAnalisis.tipoAnalisis,
    {
      cascade: [Cascade.ALL],
    }
  )
  resultadoAnalisis = new Collection<ResultadoAnalisis>(this);
}
