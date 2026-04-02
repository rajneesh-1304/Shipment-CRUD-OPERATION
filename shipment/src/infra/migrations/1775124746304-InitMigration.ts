import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1775124746304 implements MigrationInterface {
    name = 'InitMigration1775124746304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."Stop_shipmentstatus_enum" AS ENUM('Pending', 'Completed')`);
        await queryRunner.query(`ALTER TABLE "Stop" ADD "shipmentStatus" "public"."Stop_shipmentstatus_enum" NOT NULL DEFAULT 'Pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Stop" DROP COLUMN "shipmentStatus"`);
        await queryRunner.query(`DROP TYPE "public"."Stop_shipmentstatus_enum"`);
    }

}
