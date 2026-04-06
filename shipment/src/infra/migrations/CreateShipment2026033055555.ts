import { Migration } from '@mikro-orm/migrations';

const schema= process.env.DB_SCHEMA;

export class CreateShipment2026033055555 extends Migration {
  async up(): Promise<void> {
    this.addSql(`create schema if not exists "${schema}";`);
    this.addSql(`create type "${schema}"."status_shipment_enum" as enum ('PENDING', 'COMPLETED');`);

    this.addSql(`
      create table "${schema}"."shipment" (
        "id" uuid not null,
        "title" varchar not null,
        "status" "${schema}"."status_shipment_enum" not null default 'PENDING',
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz,
        constraint "shipment_pkey" primary key ("id")
      );
    `);

  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists "${schema}"."shipment";`);
    this.addSql(`drop type if exists "${schema}"."status_shipment_enum";`);
  }
}