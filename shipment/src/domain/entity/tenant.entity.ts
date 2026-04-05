import { defineEntity, InferEntity, p } from '@mikro-orm/core';
import { v4 } from 'uuid';

export const Tenant = defineEntity({
  name: 'Tenant',
  properties: {
    id: p.uuid().primary().onCreate(() => v4()),
    name: p.string(),
    createdAt: p.datetime().onCreate(() => new Date()),
  },
});

export type ITenant = InferEntity<typeof Tenant>;