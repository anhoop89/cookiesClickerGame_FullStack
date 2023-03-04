/** @module Migrate/Init */

import {MigrationInterface, QueryRunner} from "typeorm";

/**
 * This migration sets up our initial database state
 */
export class Initialize1676281754950 implements MigrationInterface {
	name = 'Initialize1676281754950';

	/**
	 * Creates initial tables
	 */
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "ip_history"
                             (
                                 "id"         SERIAL    NOT NULL,
                                 "ip"         text      NOT NULL,
                                 "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                                 "userId"     integer,
                                 CONSTRAINT "PK_497e0092c5d0220149e17a0483a" PRIMARY KEY ("id")
                             )`);
		await queryRunner.query(`CREATE TABLE "users"
                             (
                                 "id"         SERIAL                 NOT NULL,
                                 "name"       text					 NOT NULL,
                                 "email"      text                   NOT NULL,
                                 "created_at" TIMESTAMP              NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP              NOT NULL DEFAULT now(),
								 "deleted_at" TIMESTAMP,
								 "profilesGameId" integer,
								 "gameDataEntryGameId" integer,
								 CONSTRAINT "REL_26c42afe9d62a2b64fd7039ea9" UNIQUE ("profilesGameId"),
								 CONSTRAINT "REL_7621bbe9c312f8c467d8fb5fb1" UNIQUE ("gameDataEntryGameId"),  
                                 CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
                             )`);
		await queryRunner.query(`ALTER TABLE "ip_history"
        ADD CONSTRAINT "FK_b3658d04b80507751b273bf038b" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
	}

	/**
	 * Deletes initial tables
	 * @param {} queryRunner
	 * @returns {Promise<void>}
	 */
	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "ip_history" DROP CONSTRAINT "FK_b3658d04b80507751b273bf038b"`);
		await queryRunner.query(`DROP TABLE "users"`);
		await queryRunner.query(`DROP TABLE "ip_history"`);
	}

}

