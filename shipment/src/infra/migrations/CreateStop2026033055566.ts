import { Migration } from '@mikro-orm/migrations';

export class CreateShipment2026033055566 extends Migration {
  
  async up(): Promise<void> {
    this.addSql(`create type "stop_type_enum" as enum ('PICKUP', 'DELIVERY');`);
    this.addSql(`create type "stop_status_enum" as enum ('ARRIVED', 'TRANSIT', 'DEPARTED');`);
    this.addSql(`create type "status_enum" as enum ('Pending', 'Completed');`);

    this.addSql(`
      create table "stop" (
        "id" uuid not null,
        "sequence_number" int not null,
        "type" "stop_type_enum" not null,
        "status" "stop_status_enum" not null default 'TRANSIT',
        "shipment_status" "status_enum" not null default 'Pending',
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        "shipment_id" uuid not null,
        constraint "stop_pkey" primary key ("id")
      );
    `);

    this.addSql(`
      alter table "stop"
      add constraint "stop_shipment_id_foreign"
      foreign key ("shipment_id")
      references "shipment" ("id")
      on update cascade
      on delete no action;
    `);
  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists "stop";`);
    this.addSql(`drop type if exists "stop_type_enum";`);
    this.addSql(`drop type if exists "stop_status_enum";`);
    this.addSql(`drop type if exists "status_enum";`);
  }
}