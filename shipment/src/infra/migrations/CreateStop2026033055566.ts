import { Migration } from '@mikro-orm/migrations';

const schema= process.env.DB_SCHEMA;

export class CreateShipment2026033055566 extends Migration {
  
  async up(): Promise<void> {
    this.addSql(`create schema if not exists "${schema}";`);
    this.addSql(`create type "${schema}"."stop_type_enum" as enum ('PICKUP', 'DELIVERY');`);
    this.addSql(`create type "${schema}"."stop_status_enum" as enum ('ARRIVED', 'TRANSIT', 'DEPARTED');`);
    this.addSql(`create type "${schema}"."status_enum" as enum ('Pending', 'Completed');`);

    this.addSql(`
      create table "${schema}"."stop" (
        "id" uuid not null,
        "sequence_number" int not null,
        "type" "${schema}"."stop_type_enum" not null,
        "status" "${schema}"."stop_status_enum" not null default 'TRANSIT',
        "shipment_status" "${schema}"."status_enum" not null default 'Pending',
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        "shipment_id" uuid not null,
        constraint "stop_pkey" primary key ("id")
      );
    `);

    this.addSql(`
      alter table "${schema}"."stop"
      add constraint "stop_shipment_id_foreign"
      foreign key ("shipment_id")
      references "${schema}"."shipment" ("id")
      on update cascade
      on delete no action;
    `);
  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists "${schema}"."stop";`);
    this.addSql(`drop type if exists "${schema}"."stop_type_enum";`);
    this.addSql(`drop type if exists "${schema}"."stop_status_enum";`);
    this.addSql(`drop type if exists "${schema}"."status_enum";`);
  }
}