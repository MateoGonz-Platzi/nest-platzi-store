import { MigrationInterface, QueryRunner } from "typeorm";

export class createBrandProducts1666323646162 implements MigrationInterface {
    name = 'createBrandProducts1666323646162'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "brand" (
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "description" text NOT NULL,
                "image" character varying NOT NULL,
                CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"),
                CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD "brandId" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "product"
            ADD CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6" FOREIGN KEY ("brandId") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product" DROP CONSTRAINT "FK_bb7d3d9dc1fae40293795ae39d6"
        `);
        await queryRunner.query(`
            ALTER TABLE "product" DROP COLUMN "brandId"
        `);
        await queryRunner.query(`
            DROP TABLE "brand"
        `);
    }

}
