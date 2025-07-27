import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';

//import { CentroAtencion } from '../centroAtencion/centroatencionEntity.js';

@Entity()
export class Paciente extends BaseEntity {
  @Property({ nullable: false})
  public nombre!: string;

  @Property()
  public apellido!: string;

  @Property()
  public dni!: string;

  @Property()
  public fechaNacimiento!: Date;

  @Property()
  public telefono!: string;

  @Property({ nullable: false})
  public email!: string;

  @Property()
  public direccion!: string;
/*
  @OneToMany(() => Turno, (turno) => turno.paciente, {
    cascade: [Cascade.ALL],
  })  NO IMPLEMENTADO AUN
  turnos = new Collection<Turno>(this);
*/
  }
