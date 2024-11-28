import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDb1732840096664 implements MigrationInterface {
  name = 'CreateDb1732840096664';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "dueDate" TIMESTAMP NOT NULL DEFAULT ('now'::text)::date, "isCompleted" boolean NOT NULL DEFAULT false, "todoListId" integer, "userId" integer NOT NULL, CONSTRAINT "PK_d429b7114371f6a35c5cb4776a7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "todoList" ("id" SERIAL NOT NULL, "dueDate" TIMESTAMP NOT NULL DEFAULT ('now'::text)::date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "PK_e7b6abf4c12ffded9587888b3e4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tax" ("id" SERIAL NOT NULL, "number" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "reportingPeriod" TIMESTAMP NOT NULL, "dueDate" TIMESTAMP NOT NULL, "rate" numeric(5,2) NOT NULL, "paidAt" TIMESTAMP, "invoiceId" integer NOT NULL, CONSTRAINT "PK_2c1e62c595571139e2fb0e9c319" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "invoice" ("id" SERIAL NOT NULL, "number" character varying NOT NULL, "amount" numeric(10,2) NOT NULL, "description" character varying, "issuedAt" TIMESTAMP NOT NULL, "verificationCode" character varying NOT NULL, "serviceProviderId" integer NOT NULL, "serviceRecipientId" integer NOT NULL, CONSTRAINT "UQ_8bf76d2aa7bb2ed71ba69db2890" UNIQUE ("verificationCode"), CONSTRAINT "PK_15d25c200d9bcd8a33f698daf18" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "corporateName" character varying NOT NULL, "companyIdentifier" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c" FOREIGN KEY ("todoListId") REFERENCES "todoList"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todoList" ADD CONSTRAINT "FK_2e3049d7efb51134cbdf71dfba0" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tax" ADD CONSTRAINT "FK_546461ff7e7f90c8d92070b75e9" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_2a735dad0c71bbb3f63c2bb576c" FOREIGN KEY ("serviceProviderId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" ADD CONSTRAINT "FK_b419cf911ded98cd23999e2e4d3" FOREIGN KEY ("serviceRecipientId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_b419cf911ded98cd23999e2e4d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invoice" DROP CONSTRAINT "FK_2a735dad0c71bbb3f63c2bb576c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tax" DROP CONSTRAINT "FK_546461ff7e7f90c8d92070b75e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todoList" DROP CONSTRAINT "FK_2e3049d7efb51134cbdf71dfba0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo" DROP CONSTRAINT "FK_d2b734249ae64a7c7468d1d104c"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "company"`);
    await queryRunner.query(`DROP TABLE "invoice"`);
    await queryRunner.query(`DROP TABLE "tax"`);
    await queryRunner.query(`DROP TABLE "todoList"`);
    await queryRunner.query(`DROP TABLE "todo"`);
  }
}
