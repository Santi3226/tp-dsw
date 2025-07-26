/*import { Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Localidad } from '../localidad/localidadEntity.js';

@Entity()
export class CentroAtencion extends BaseEntity {
  @Property({ nullable: false, unique: true })
  public nombre!: string;

  @Property()
  public domicilio!: string;

  @ManyToOne(() => Localidad, { nullable: false, onDelete: 'cascade' })
  localidad!: Rel<Localidad>;
  //OnetoMany turnos
}
*/
import { Entity, ManyToOne, Property, Rel } from '@mikro-orm/core'; // Ya no necesitas 'Rel' si es Rel<Localidad>
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Localidad } from '../localidad/localidadEntity.js';

@Entity()
export class CentroAtencion extends BaseEntity {
  @Property({ nullable: false, unique: true })
  public nombre!: string;

  @Property()
  public domicilio!: string;

  @ManyToOne(() => Localidad, { nullable: false, updateRule: 'cascade', deleteRule: 'cascade' })
  localidad!: Rel<Localidad>;

  // OnetoMany turnos
}
