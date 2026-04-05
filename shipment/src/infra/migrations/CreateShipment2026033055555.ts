import { Migration } from '@mikro-orm/migrations';

export class CreateShipment2026033055555 extends Migration {
  async up(): Promise<void> {
    this.addSql(`create type "status_shipment_enum" as enum ('PENDING', 'COMPLETED');`);

    this.addSql(`
      create table "shipment" (
        "id" uuid not null,
        "title" varchar not null,
        "status" "status_shipment_enum" not null default 'PENDING',
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz,
        "tenant_id" uuid not null,
        constraint "shipment_pkey" primary key ("id")
      );
    `);

    this.addSql(`
      alter table "shipment"
      add constraint "shipment_tenant_id_foreign"
      foreign key ("tenant_id")
      references "tenant" ("id")
      on update cascade
      on delete cascade;
    `);

  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "shipment";');
    this.addSql('drop type if exists "status_shipment_enum";');
  }
}