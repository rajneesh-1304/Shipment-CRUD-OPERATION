import { v4 } from 'uuid';
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class Tenant {
  @PrimaryKey({ type: 'uuid' })
  id: string = v4();

  @Property()
  name!: string;

  @Property({ onCreate: () => new Date() })
  createdAt: Date = new Date();
}

export type ITenant = Tenant;

// import { defineEntity, InferEntity, p } from '@mikro-orm/core';

// export const Tenant = defineEntity({
//   name: 'Tenant',
//   properties: {
//     id: p.uuid().primary().onCreate(() => v4()),
//     name: p.string(),
//     createdAt: p.datetime().onCreate(() => new Date()),
//   },
// });

// export type ITenant = InferEntity<typeof Tenant>;
