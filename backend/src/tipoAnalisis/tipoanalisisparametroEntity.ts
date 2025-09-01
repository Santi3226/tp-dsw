import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryKeyProp,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { TipoAnalisis } from './tipoanalisisEntity.js';
import { ParametroAnalisis } from '../parametroAnalisis/parametroanalisisEntity.js';

@Entity()
export class TipoAnalisisParametro {
  @ManyToOne(() => TipoAnalisis, { primary: true, updateRule: 'cascade', deleteRule: 'cascade' })
  tipoAnalisis!: Rel<TipoAnalisis>;

  @ManyToOne(() => ParametroAnalisis, { primary: true, updateRule: 'cascade', deleteRule: 'cascade' })
  parametroAnalisis!: Rel<ParametroAnalisis>;

  [PrimaryKeyProp]?: ['tipoAnalisis', 'parametroAnalisis'];
};