import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelateUserTodo1732130051131 implements MigrationInterface {
  name = 'RelateUserTodo1732130051131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "todo" ADD "userId" integer NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "dueDate" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "dueDate" SET DEFAULT ('now'::text)::date`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "todoListId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todoList" ALTER COLUMN "dueDate" SET DEFAULT ('now'::text)::date`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c" FOREIGN KEY ("todoListId") REFERENCES "todoList"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todoList" ALTER COLUMN "dueDate" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "todoListId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "dueDate" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ALTER COLUMN "dueDate" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c" FOREIGN KEY ("todoListId") REFERENCES "todoList"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "userId"`);
  }
}
