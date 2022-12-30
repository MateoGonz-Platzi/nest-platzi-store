import { MigrationInterface, QueryRunner } from "typeorm";

export class createCategoriesAutoId1672364745927 implements MigrationInterface {
    name = 'createCategoriesAutoId1672364745927'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "category_products" DROP CONSTRAINT "FK_32ec224dcbe81a122d5c35a1305"
        `);
        await queryRunner.query(`
            CREATE SEQUENCE IF NOT EXISTS "category_id_seq" OWNED BY "category"."id"
        `);
        await queryRunner.query(`
            ALTER TABLE "category"
            ALTER COLUMN "id"
            SET DEFAULT nextval('"category_id_seq"')
        `);
        await queryRunner.query(`
            ALTER TABLE "category_products"
            ADD CONSTRAINT "FK_32ec224dcbe81a122d5c35a1305" FOREIGN KEY ("pk_category") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "category_products" DROP CONSTRAINT "FK_32ec224dcbe81a122d5c35a1305"
        `);
        await queryRunner.query(`
            ALTER TABLE "category"
            ALTER COLUMN "id" DROP DEFAULT
        `);
        await queryRunner.query(`
            DROP SEQUENCE "category_id_seq"
        `);
        await queryRunner.query(`
            ALTER TABLE "category_products"
            ADD CONSTRAINT "FK_32ec224dcbe81a122d5c35a1305" FOREIGN KEY ("pk_category") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

}
