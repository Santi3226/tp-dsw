import { Entity,OneToMany,Cascade,Collection, ManyToOne, Property, Rel } from '@mikro-orm/core'; // Ya no necesitas 'Rel' si es Rel<Localidad>
import { BaseEntity } from '../shared/db/baseEntity.js';
import { Localidad } from '../localidad/localidadEntity.js';
import { Turno } from '../turno/turnoEntity.js';

@Entity()
export class CentroAtencion extends BaseEntity {
  @Property({ nullable: false, unique: true })
  public nombre!: string;

  @Property()
  public domicilio!: string;

  @ManyToOne(() => Localidad, { nullable: false, updateRule: 'cascade', deleteRule: 'cascade' })
  localidad!: Rel<Localidad>;

  
  @OneToMany(() => Turno, (turno) => turno.centroAtencion, {
      cascade: [Cascade.ALL],
    })
    turno = new Collection<Turno>(this);
}
