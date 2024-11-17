import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordColumn1731806462422 implements MigrationInterface {
  name = 'AddPasswordColumn1731806462422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
