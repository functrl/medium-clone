import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUsernameToUsers1632392032690 implements MigrationInterface {
    name = 'AddUsernameToUsers1632392032690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "username" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "username"`);
    }

}
