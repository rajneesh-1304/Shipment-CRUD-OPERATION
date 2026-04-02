import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1775123347339 implements MigrationInterface {
    name = 'InitMigration1775123347339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Stop_type_enum" AS ENUM('PICKUP', 'DELIVERY')`);
        await queryRunner.query(`CREATE TYPE "public"."Stop_status_enum" AS ENUM('ARRIVED', 'TRANSIT', 'DEPARTED')`);
        await queryRunner.query(`CREATE TABLE "Stop" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sequenceNumber" integer NOT NULL, "type" "public"."Stop_type_enum" NOT NULL, "status" "public"."Stop_status_enum" NOT NULL DEFAULT 'TRANSIT', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "shipmentId" uuid, CONSTRAINT "PK_0b9105898d8eb92736983a30c82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."shipment_status_enum" AS ENUM('PENDING', 'COMPLETED')`);
        await queryRunner.query(`CREATE TABLE "shipment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "status" "public"."shipment_status_enum" NOT NULL DEFAULT 'PENDING', "totalStops" integer NOT NULL, "coveredStops" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f51f635db95c534ca206bf7a0a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "Stop" ADD CONSTRAINT "FK_6cb2b27abf0ae85e9c4553f890f" FOREIGN KEY ("shipmentId") REFERENCES "shipment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Stop" DROP CONSTRAINT "FK_6cb2b27abf0ae85e9c4553f890f"`);
        await queryRunner.query(`DROP TABLE "shipment"`);
        await queryRunner.query(`DROP TYPE "public"."shipment_status_enum"`);
        await queryRunner.query(`DROP TABLE "Stop"`);
        await queryRunner.query(`DROP TYPE "public"."Stop_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."Stop_type_enum"`);
    }

}
