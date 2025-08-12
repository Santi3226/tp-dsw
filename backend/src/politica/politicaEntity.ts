import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/db/baseEntity.js';

@Entity()
export class Politica extends BaseEntity {
  @Property({ nullable: false })
  public diaHabilitacionTurnos!: number;

  @Property({ nullable: false })
  public horaInicioTurnos!: String; //El Date de TS me hace problema

  @Property({ nullable: false })
  public horaFinTurnos!: String;
}
