import { MigrationInterface, QueryRunner } from "typeorm";

export class updateUserRole1673410653266 implements MigrationInterface {
    name = 'updateUserRole1673410653266'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "brand" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "description" text NOT NULL,
                "image" character varying NOT NULL,
                CONSTRAINT "UQ_5f468ae5696f07da025138e38f7" UNIQUE ("name"),
                CONSTRAINT "PK_a5d20765ddd942eb5de4eee2d7f" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "category" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "description" character varying(255) NOT NULL,
                CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"),
                CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "products" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "description" text NOT NULL,
                "price" integer NOT NULL,
                "stock" integer NOT NULL,
                "image" character varying NOT NULL,
                "brand_id" integer,
                CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"),
                CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_75895eeb1903f8a17816dafe0a" ON "products" ("price")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_4fbc36ad745962e5c11001e1a8" ON "products" ("price", "stock")
        `);
        await queryRunner.query(`
            CREATE TABLE "user" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "role" character varying(100) NOT NULL,
                "name" character varying(255) NOT NULL,
                "lastname" character varying(255) NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying NOT NULL,
                "password" character varying(255) NOT NULL,
                "customer_id" integer,
                CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"),
                CONSTRAINT "REL_d72eb2a5bbff4f2533a5d4caff" UNIQUE ("customer_id"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "customer" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "lastname" character varying(255) NOT NULL,
                "email" character varying NOT NULL,
                "phone" character varying NOT NULL,
                CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "customerId" integer,
                CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "order_item" (
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "id" SERIAL NOT NULL,
                "quantity" integer NOT NULL,
                "productId" integer,
                "orderId" integer,
                CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY ("id")
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
            CREATE TABLE "product_categories" (
                "product_id" integer NOT NULL,
                "category_id" integer NOT NULL,
                CONSTRAINT "PK_54f2e1dbf14cfa770f59f0aac8f" PRIMARY KEY ("product_id", "category_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_8748b4a0e8de6d266f2bbc877f" ON "product_categories" ("product_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_9148da8f26fc248e77a387e311" ON "product_categories" ("category_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "products"
            ADD CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order"
            ADD CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item"
            ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item"
            ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "category_products"
            ADD CONSTRAINT "FK_32ec224dcbe81a122d5c35a1305" FOREIGN KEY ("pk_category") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "category_products"
            ADD CONSTRAINT "FK_656e29770e6c3cc61f5eb3dcca4" FOREIGN KEY ("pk_product") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "product_categories"
            ADD CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "product_categories"
            ADD CONSTRAINT "FK_9148da8f26fc248e77a387e3112" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "product_categories" DROP CONSTRAINT "FK_9148da8f26fc248e77a387e3112"
        `);
        await queryRunner.query(`
            ALTER TABLE "product_categories" DROP CONSTRAINT "FK_8748b4a0e8de6d266f2bbc877f6"
        `);
        await queryRunner.query(`
            ALTER TABLE "category_products" DROP CONSTRAINT "FK_656e29770e6c3cc61f5eb3dcca4"
        `);
        await queryRunner.query(`
            ALTER TABLE "category_products" DROP CONSTRAINT "FK_32ec224dcbe81a122d5c35a1305"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item" DROP CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0"
        `);
        await queryRunner.query(`
            ALTER TABLE "order_item" DROP CONSTRAINT "FK_904370c093ceea4369659a3c810"
        `);
        await queryRunner.query(`
            ALTER TABLE "order" DROP CONSTRAINT "FK_124456e637cca7a415897dce659"
        `);
        await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_d72eb2a5bbff4f2533a5d4caff9"
        `);
        await queryRunner.query(`
            ALTER TABLE "products" DROP CONSTRAINT "FK_1530a6f15d3c79d1b70be98f2be"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_9148da8f26fc248e77a387e311"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_8748b4a0e8de6d266f2bbc877f"
        `);
        await queryRunner.query(`
            DROP TABLE "product_categories"
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
            DROP TABLE "order_item"
        `);
        await queryRunner.query(`
            DROP TABLE "order"
        `);
        await queryRunner.query(`
            DROP TABLE "customer"
        `);
        await queryRunner.query(`
            DROP TABLE "user"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_4fbc36ad745962e5c11001e1a8"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_75895eeb1903f8a17816dafe0a"
        `);
        await queryRunner.query(`
            DROP TABLE "products"
        `);
        await queryRunner.query(`
            DROP TABLE "category"
        `);
        await queryRunner.query(`
            DROP TABLE "brand"
        `);
    }

}