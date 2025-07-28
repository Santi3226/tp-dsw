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
import { Paciente } from '../paciente/pacienteEntity.js';
import { CentroAtencion } from '../centroAtencion/centroatencionEntity.js';
import { TipoAnalisis } from '../tipoAnalisis/tipoanalisisEntity.js';

@Entity()
export class Turno extends BaseEntity {
  @Property({ nullable: false })
  public recibeMail!: boolean;

  @Property({ nullable: false })
  public estado!: string;

  @Property()
  public receta!: string; //A CAMBIAR

  @Property()
  public observacion!: string;

  @Property()
  public fechaHoraExtraccion!: Date;

  @ManyToOne(() => Paciente, {
    nullable: false,
    updateRule: 'cascade',
    deleteRule: 'cascade',
  })
  paciente!: Rel<Paciente>;

  @ManyToOne(() => CentroAtencion, {
    nullable: false,
    updateRule: 'cascade',
    deleteRule: 'cascade',
  })
  centroAtencion!: Rel<CentroAtencion>;

  @ManyToOne(() => TipoAnalisis, {
    nullable: false,
    updateRule: 'cascade',
    deleteRule: 'cascade',
  })
  tipoAnalisis!: Rel<TipoAnalisis>;
}
