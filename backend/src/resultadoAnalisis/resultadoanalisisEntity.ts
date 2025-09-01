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
  @ManyToOne(() => Turno, { primary: true, updateRule: 'cascade', deleteRule: 'cascade' })
  turno!: Rel<Turno>;

  @ManyToOne(() => ParametroAnalisis, { primary: true, updateRule: 'cascade', deleteRule: 'cascade' })
  parametroAnalisis!: Rel<ParametroAnalisis>;

  @Property({ nullable: false })
  valor!: string; // Cambiado a string para poder almacenar valores numéricos o de texto (positivo/negativo)
  
  [PrimaryKeyProp]?: ['parametroAnalisis', 'turno'];
}