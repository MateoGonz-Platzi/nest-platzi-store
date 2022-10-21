import { MigrationInterface, QueryRunner } from "typeorm";

export class createUserCustomer1666154301643 implements MigrationInterface {
    name = 'createUserCustomer1666154301643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "dateCreatedat"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "dateUpdatedat"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "dateCreatedat"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "dateUpdatedat"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "dateCreatedat"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "dateUpdatedat"
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "createdAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "dateUpdatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "customer"
            ADD "dateCreatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "dateUpdatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD "dateCreatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "dateUpdatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "dateCreatedat" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

}
