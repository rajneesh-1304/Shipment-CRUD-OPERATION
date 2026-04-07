import { Migration } from '@mikro-orm/migrations';

export class Create1Tenant20260330044444 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      create table "tenant" (
        "id" uuid not null,
        "name" varchar not null,
        "created_at" timestamptz not null default now(),
        constraint "tenant_pkey" primary key ("id")
      );
    `);
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "tenant";');
  }
}