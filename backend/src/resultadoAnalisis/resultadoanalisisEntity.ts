import {
  Entity,
  ManyToOne,
  PrimaryKeyProp,
  Property,
  Rel,
} from '@mikro-orm/core';
import { ParametroAnalisis } from '../parametroAnalisis/parametroanalisisEntity.js';
import { TipoAnalisis } from '../tipoAnalisis/tipoanalisisEntity.js';
import { Turno } from '../turno/turnoEntity.js';

@Entity()
export class ResultadoAnalisis {
    @ManyToOne(() => ParametroAnalisis, {
    nullable: false,
    primary: true,
    updateRule: 'cascade',
    deleteRule: 'cascade',
  })
  parametroAnalisis!: Rel<ParametroAnalisis>;

  @ManyToOne(() => Turno, {
    nullable: false,
    primary: true,
    updateRule: 'cascade',
    deleteRule: 'cascade',
  })
  turno!: Rel<Turno>;

  @Property({ nullable: false })
  public valor!: number;

  @ManyToOne(() => TipoAnalisis, {
    nullable: false,
    updateRule: 'cascade',
    deleteRule: 'cascade',
  })
  tipoAnalisis!: Rel<TipoAnalisis>;

  [PrimaryKeyProp]?: ['parametroAnalisis', 'turno'];
}