import { MigrationInterface, QueryRunner } from "typeorm";

export class ProfilesMigration1676586883555 implements MigrationInterface {
    name = 'ProfilesMigration1676586883555'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "picture" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "profile" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`);
        await queryRunner.query(`DROP TABLE "profile"`);
    }

}
