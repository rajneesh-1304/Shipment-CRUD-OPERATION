import { defineEntity, InferEntity, p } from '@mikro-orm/core';
import { Stop } from './stop.entity';
import { v4 } from 'uuid';

export enum STATUS{
    PENDING = "PENDING",
    COMPLETED = "COMPLETED"
}

export const Shipment = defineEntity({
  name: 'Shipment',
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