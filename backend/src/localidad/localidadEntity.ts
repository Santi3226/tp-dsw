import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';
@Entity()
export class Localidad extends BaseEntity {
  @Property({ nullable: false, unique: true })
  public denominacion!: string;
  @Property()
  public codPostal!: string;
}

/*
Imaginando una clase dependiente de Localidad, por ejemplo una clase Provincia que tenga una propiedad localidad:
@Entity({ tableName: 'provincia' })
export class Provincia {
  @PrimaryKey()
  public id?: number
  @Property({ nullable: false })
  public nombre!: string
  @ManyToOne(() => Localidad, { nullable: false })
  public localidad!: Localidad;
}

O reescribiendo la propiedad localidad en la clase Localidad:
@Entity({ tableName: 'localidad' })
export class Localidad {
  @PrimaryKey()
  public id?: number
  @Property({ nullable: false, unique: true })
  public denominacion!: string
  @Property()
  public codPostal!: string
  @OneToMany(() => Provincia, (provincia) => provincia.localidad, { cascade: [Cascade.ALL] })
  public provincias = new Collection<Provincia>(this);
}

@ManyToMany(() => Item, (item) => item.charcters, { 
cascade: [Cascade.ALL],
owner: true, 
})
  public items!: Item[];;
*/
