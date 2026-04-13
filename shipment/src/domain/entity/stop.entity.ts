import { defineEntity, p, InferEntity,} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { Shipment } from './shipment.entity';
import { StopDomain } from '../domainlogic/stop.domain';

export enum StopType{
    PICKUP = "PICKUP",
    DELIVERY = "DELIVERY"
}

export enum STOPSTATUS{
    ARRIVED = 'ARRIVED',
    TRANSIT = 'TRANSIT',
    DEPARTED = 'DEPARTED'
}

export enum Status{
    Pending = "Pending",
    Completed = "Completed"
}

// @Entity({ tableName: 'stop', schema: '*' }) 
// export class Stop {
//   @PrimaryKey({ type: 'uuid' })
//   id: string = v4();

//   @Property()
//   sequenceNumber!: number;

//   @Enum(() => StopType)
//   type!: StopType;

//   @Enum(() => STOPSTATUS)
//   status: STOPSTATUS = STOPSTATUS.TRANSIT;

//   @Enum(() => Status)
//   shipmentStatus: Status = Status.Pending;

//   @Property({ onCreate: () => new Date() })
//   createdAt: Date = new Date();

//   @Property({
//     onCreate: () => new Date(),
//     onUpdate: () => new Date(),
//   })
//   updatedAt: Date = new Date();

//   @ManyToOne(() => Shipment)
//   shipment!: Shipment;
// }


export const Stop = defineEntity({
  name: 'Stop',
  schema: '*',
  tableName: 'stop',
  class: StopDomain,
  properties: {
    id: p.uuid().primary().onCreate(() => v4()),
    sequenceNumber: p.integer(),
    type: p.enum(()=> StopType),
    status: p.enum(()=> STOPSTATUS).default(STOPSTATUS.TRANSIT),
    shipmentStatus: p.enum(()=> Status).default(Status.Pending),
    createdAt: p.datetime().onCreate(() => new Date()),
    updatedAt: p.datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date()),
    shipment: () => p.manyToOne(Shipment),
  },
});

export type IStop = InferEntity<typeof Stop>;