import { defineEntity, InferEntity, p } from '@mikro-orm/core';
import { Shipment } from './shipment.entity';
import { v4 } from 'uuid';
import { Tenant } from './tenant.entity';

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

export const Stop = defineEntity({
  name: 'Stop',
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
    tenant: () => p.manyToOne(Tenant),
  },
});

export type IStop = InferEntity<typeof Stop>;