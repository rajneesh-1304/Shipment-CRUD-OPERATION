import { Entity,  PrimaryKey,  Property,  Enum,  OneToMany,  Collection,} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Stop } from './stop.entity';

export enum STATUS {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

// @Entity({ tableName: 'shipment', schema: '*' }) 
// export class Shipment {

//   @PrimaryKey({ type: 'uuid' })
//   id: string = v4();

//   @Property()
//   title!: string;

//   @Enum(() => STATUS)
//   status: STATUS = STATUS.PENDING;

//   @Property({ onCreate: () => new Date() })
//   createdAt: Date = new Date();

//   @Property({
//     onCreate: () => new Date(),
//     onUpdate: () => new Date(),
//   })
//   updatedAt: Date = new Date();

//   @OneToMany(() => Stop, stop => stop.shipment)
//   stops: Stop[] = [];
// }

import { defineEntity, InferEntity, p } from '@mikro-orm/core';
import { ShipmentDomain } from '../domainlogic/shipment.domain';

export const Shipment = defineEntity({
  name: 'Shipment',
  schema: '*',
  tableName: 'shipment',
  class: ShipmentDomain,
  properties: {
    id: p.uuid().primary().onCreate(() => v4()),
    title: p.string(),
    status: () => p.enum(()=> STATUS).default(STATUS.PENDING),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
    stops: () => p.oneToMany(Stop).mappedBy('shipment'),
  },
});

export type IShipment = InferEntity<typeof Shipment>;


