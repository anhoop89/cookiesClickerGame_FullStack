import { MigrationInterface, QueryRunner } from "typeorm";

export class SuggestionsMigration1678341884657 implements MigrationInterface {
    name = 'SuggestionsMigration1678341884657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suggestions" 
                            (
                                "id"            SERIAL          NOT NULL, 
                                "name"          text            NOT NULL, 
                                "email"         text            NOT NULL, 
                                "comments"      text            NOT NULL, 
                                "created_at"    TIMESTAMP       NOT NULL DEFAULT now(), 
                                CONSTRAINT "PK_745bbcb037ac379969b5fc7b352" PRIMARY KEY ("id"))`
                            );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "suggestions"`);
    }

}
