import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixRelations1731820241772 implements MigrationInterface {
  name = 'FixRelations1731820241772';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "dueDate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "isCompleted" SET DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "isCompleted" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "dueDate" SET NOT NULL`,
    );
  }
}
