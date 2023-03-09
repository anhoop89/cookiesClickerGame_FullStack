import { MigrationInterface, QueryRunner } from "typeorm";

export class GameDataMigration1677898086475 implements MigrationInterface {
    name = 'GameDataMigration1677898086475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game_data" 
                                (
                                    "gameId"                SERIAL          NOT NULL, 
                                    "num_of_clicks"         integer         NOT NULL, 
                                    "num_of_upgrade_one"    integer         NOT NULL, 
                                    "num_of_upgrade_two"    integer         NOT NULL, 
                                    "created_at"            TIMESTAMP       NOT NULL DEFAULT now(), 
                                    "updated_at"            TIMESTAMP       NOT NULL DEFAULT now(),
                                    "userId"                integer, 
                                    CONSTRAINT "PK_8854ee113e5b5d9c43ff9ee1c8b" PRIMARY KEY ("gameId"))`);
                                    await queryRunner.query(`ALTER TABLE "game_data" ADD CONSTRAINT "FK_a24972ebd73b106250713dcddd9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game_data" DROP CONSTRAINT "FK_a24972ebd73b106250713dcddd9"`);
        await queryRunner.query(`DROP TABLE "game_data"`);
    }

}
