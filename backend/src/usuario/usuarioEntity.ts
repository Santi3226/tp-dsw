import { Entity, OneToOne, Property, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Paciente } from '../paciente/pacienteEntity.js';

@Entity()
export class Usuario extends BaseEntity {
  @Property({ nullable: false })
  public email!: string;

  @Property({ nullable: false })
  public contraseña!: string;

  @Property({ nullable: false })
  public role!: string;

  @OneToOne(() => Paciente, (paciente) => paciente.usuario, {
    owner: true,
    nullable: true,
    updateRule: 'cascade',
    deleteRule: 'cascade',
  })
  paciente?: Rel<Paciente>;
}
