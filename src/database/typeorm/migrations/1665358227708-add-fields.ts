import { MigrationInterface, QueryRunner } from "typeorm";

export class addFields1665358227708 implements MigrationInterface {
    name = 'addFields1665358227708'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "updatedAt"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "createdAt"
        `);
    }

}
