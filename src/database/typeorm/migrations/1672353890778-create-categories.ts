import { MigrationInterface, QueryRunner } from "typeorm";

export class createCategories1672353890778 implements MigrationInterface {
    name = 'createCategories1672353890778'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "category" (
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" integer NOT NULL,
                "name" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"),
                CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "category_products" (
                "pk_category" integer NOT NULL,
                "pk_product" integer NOT NULL,
                CONSTRAINT "PK_bddff246f4f06afa0e3920b1a02" PRIMARY KEY ("pk_category", "pk_product")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_32ec224dcbe81a122d5c35a130" ON "category_products" ("pk_category")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_656e29770e6c3cc61f5eb3dcca" ON "category_products" ("pk_product")
        `);
        await queryRunner.query(`
            ALTER TABLE "category_products"
            ADD CONSTRAINT "FK_32ec224dcbe81a122d5c35a1305" FOREIGN KEY ("pk_category") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "category_products"
            ADD CONSTRAINT "FK_656e29770e6c3cc61f5eb3dcca4" FOREIGN KEY ("pk_product") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "category_products" DROP CONSTRAINT "FK_656e29770e6c3cc61f5eb3dcca4"
        `);
        await queryRunner.query(`
            ALTER TABLE "category_products" DROP CONSTRAINT "FK_32ec224dcbe81a122d5c35a1305"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_656e29770e6c3cc61f5eb3dcca"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_32ec224dcbe81a122d5c35a130"
        `);
        await queryRunner.query(`
            DROP TABLE "category_products"
        `);
        await queryRunner.query(`
            DROP TABLE "category"
        `);
    }

}
