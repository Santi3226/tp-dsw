import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Turno } from '../turno/turnoEntity.js';

//import { CentroAtencion } from '../centroAtencion/centroatencionEntity.js';

@Entity()
export class Paciente extends BaseEntity {
  @Property({ nullable: false})
  public nombre!: string;

  @Property({ nullable: false})
  public apellido!: string;

  @Property({ nullable: false})
  public dni!: string;

  @Property({ nullable: false})
  public fechaNacimiento!: Date;

  @Property({ nullable: false})
  public telefono!: string;

  @Property({ nullable: false})
  public email!: string;

  @Property()
  public direccion!: string;

  @OneToMany(() => Turno, (turno) => turno.paciente, {
    cascade: [Cascade.ALL],
  }) 
  turnos = new Collection<Turno>(this);

  }
