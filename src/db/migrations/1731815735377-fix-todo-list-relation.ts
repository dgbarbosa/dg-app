import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTodoListRelation1731815735377 implements MigrationInterface {
    name = 'FixTodoListRelation1731815735377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c"`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "todoListId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todoList" DROP CONSTRAINT "FK_2e3049d7efb51134cbdf71dfba0"`);
        await queryRunner.query(`ALTER TABLE "todoList" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c" FOREIGN KEY ("todoListId") REFERENCES "todoList"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todoList" ADD CONSTRAINT "FK_2e3049d7efb51134cbdf71dfba0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todoList" DROP CONSTRAINT "FK_2e3049d7efb51134cbdf71dfba0"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c"`);
        await queryRunner.query(`ALTER TABLE "todoList" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todoList" ADD CONSTRAINT "FK_2e3049d7efb51134cbdf71dfba0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo" ALTER COLUMN "todoListId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c" FOREIGN KEY ("todoListId") REFERENCES "todoList"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "todo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
