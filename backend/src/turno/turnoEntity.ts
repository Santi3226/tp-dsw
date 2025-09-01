import {
  Cascade,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Paciente } from '../paciente/pacienteEntity.js';
import { CentroAtencion } from '../centroAtencion/centroatencionEntity.js';
import { TipoAnalisis } from '../tipoAnalisis/tipoanalisisEntity.js';
import { ResultadoAnalisis } from '../resultadoAnalisis/resultadoanalisisEntity.js';

@Entity()
export class Turno extends BaseEntity {
  @Property({ nullable: false })
  public recibeMail!: boolean;

  @Property({ default: false })
  notificacionEnviada!: boolean; 

  @Property({ nullable: false })
  public estado!: string;

  @Property()
  public receta!: string;

  @Property({ default: "-" })
  public observacion!: string;

  @Property({ nullable: true })
  public fechaHoraExtraccion!: Date;

  @Property({ nullable: false })
  public fechaHoraReserva!: Date;

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

  @OneToMany(() => ResultadoAnalisis, (resultado) => resultado.turno, { cascade: [Cascade.ALL] })
  resultados = new Collection<ResultadoAnalisis>(this);

}
