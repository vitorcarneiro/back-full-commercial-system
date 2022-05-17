/*
  Warnings:

  - You are about to drop the `adress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `brand` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `invoice_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `measurement_relation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_info` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_inventory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_invoice` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_key_word` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_subcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `salesperson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shipper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `supplier` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "invoice" DROP CONSTRAINT "invoice_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "invoice_info" DROP CONSTRAINT "invoice_info_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "invoice_info" DROP CONSTRAINT "invoice_info_shipper_id_fkey";

-- DropForeignKey
ALTER TABLE "measurement_relation" DROP CONSTRAINT "measurement_relation_prduct_id_fkey";

-- DropForeignKey
ALTER TABLE "payment" DROP CONSTRAINT "payment_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_changed_by_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_subcategory_id_fkey";

-- DropForeignKey
ALTER TABLE "product_info" DROP CONSTRAINT "product_info_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_inventory" DROP CONSTRAINT "product_inventory_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_invoice" DROP CONSTRAINT "product_invoice_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "product_invoice" DROP CONSTRAINT "product_invoice_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_key_word" DROP CONSTRAINT "product_key_word_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_subcategory" DROP CONSTRAINT "product_subcategory_category_id_fkey";

-- DropForeignKey
ALTER TABLE "salesperson" DROP CONSTRAINT "salesperson_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "shipper" DROP CONSTRAINT "shipper_adress_id_fkey";

-- DropForeignKey
ALTER TABLE "supplier" DROP CONSTRAINT "supplier_adress_id_fkey";

-- DropTable
DROP TABLE "adress";

-- DropTable
DROP TABLE "brand";

-- DropTable
DROP TABLE "invoice";

-- DropTable
DROP TABLE "invoice_info";

-- DropTable
DROP TABLE "measurement_relation";

-- DropTable
DROP TABLE "payment";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "product_category";

-- DropTable
DROP TABLE "product_info";

-- DropTable
DROP TABLE "product_inventory";

-- DropTable
DROP TABLE "product_invoice";

-- DropTable
DROP TABLE "product_key_word";

-- DropTable
DROP TABLE "product_subcategory";

-- DropTable
DROP TABLE "salesperson";

-- DropTable
DROP TABLE "shipper";

-- DropTable
DROP TABLE "supplier";

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "complement" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brands" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brands_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" SERIAL NOT NULL,
    "access_key" TEXT,
    "supplier_id" INTEGER NOT NULL,
    "products_cost" INTEGER NOT NULL,
    "total_cost" INTEGER,
    "installments_quantity" INTEGER NOT NULL,
    "salesperson_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_infos" (
    "id" SERIAL NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "number" TEXT NOT NULL,
    "serie" TEXT,
    "ipi" INTEGER NOT NULL DEFAULT 0,
    "icms" INTEGER NOT NULL DEFAULT 0,
    "fcp" INTEGER NOT NULL DEFAULT 0,
    "shipping" INTEGER NOT NULL DEFAULT 0,
    "shipper_id" INTEGER,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "issue_date" DATE NOT NULL,
    "others_expenses" INTEGER NOT NULL DEFAULT 0,
    "obs" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_infos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_relations" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "unit1_name" TEXT NOT NULL,
    "unit1_quantity" INTEGER NOT NULL,
    "unit2_name" TEXT NOT NULL,
    "unit2_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measurement_relations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" SERIAL NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "due_date" DATE NOT NULL,
    "installment_number" INTEGER NOT NULL DEFAULT 1,
    "bank_description" TEXT,
    "obs" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sale_price" INTEGER NOT NULL,
    "sku" TEXT NOT NULL,
    "barcode" TEXT,
    "measurement_unit" TEXT NOT NULL,
    "allowed_fraction" BOOLEAN NOT NULL DEFAULT false,
    "category_id" INTEGER,
    "subcategory_id" INTEGER,
    "changed_by" INTEGER,
    "brand_id" INTEGER NOT NULL,
    "allowed_price_change" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_info" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "description" TEXT,
    "image_path" TEXT,
    "gross_weight" INTEGER,
    "location" TEXT,
    "net_weight" INTEGER,
    "ncm" TEXT,
    "cest" TEXT,
    "tributation_code" TEXT,

    CONSTRAINT "products_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_inventories" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER,
    "monthly_quantity" INTEGER,
    "min_quantity" INTEGER DEFAULT 2,
    "measurement_unit" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "products_inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_invoices" (
    "id" SERIAL NOT NULL,
    "product_name" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "measurement_unit" TEXT NOT NULL,
    "net_cost" INTEGER NOT NULL DEFAULT 0,
    "gross_cost" INTEGER,
    "icms" INTEGER NOT NULL DEFAULT 0,
    "ipi" INTEGER NOT NULL DEFAULT 0,
    "fcp" INTEGER NOT NULL DEFAULT 0,
    "shipping" INTEGER NOT NULL DEFAULT 0,
    "others_expenses" INTEGER NOT NULL DEFAULT 0,
    "ncm" TEXT,
    "cest" TEXT,
    "shipping_cost" INTEGER NOT NULL DEFAULT 0,
    "supplier_code" TEXT,
    "min_quantity" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_key_words" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_key_words_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products_subcategories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_subcategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salespeople" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT,
    "supplier_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "salespeople_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shippers" (
    "id" SERIAL NOT NULL,
    "cnpj" CHAR(14) NOT NULL,
    "company_name" TEXT,
    "trade_name" TEXT NOT NULL,
    "state_code" TEXT,
    "state_code_subst" TEXT,
    "type" TEXT,
    "uf" TEXT,
    "phone_number" TEXT,
    "email" TEXT,
    "address_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shippers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "suppliers" (
    "id" SERIAL NOT NULL,
    "cnpj" CHAR(14) NOT NULL,
    "company_name" TEXT,
    "trade_name" TEXT NOT NULL,
    "state_registration" TEXT,
    "state_registration_subst" TEXT,
    "type" TEXT,
    "uf" TEXT,
    "phone_number" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "address_id" INTEGER,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "suppliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_sku_key" ON "products"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "salespeople_name_key" ON "salespeople"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoice_infos" ADD CONSTRAINT "invoice_infos_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoice_infos" ADD CONSTRAINT "invoice_infos_shipper_id_fkey" FOREIGN KEY ("shipper_id") REFERENCES "shippers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "measurement_relations" ADD CONSTRAINT "measurement_relation_prduct_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "products_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "products_subcategories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products_info" ADD CONSTRAINT "products_info_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products_inventories" ADD CONSTRAINT "products_inventories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products_invoices" ADD CONSTRAINT "products_invoices_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products_invoices" ADD CONSTRAINT "products_invoices_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_key_words" ADD CONSTRAINT "product_key_words_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products_subcategories" ADD CONSTRAINT "products_subcategories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "products_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "salespeople" ADD CONSTRAINT "salespeople_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shippers" ADD CONSTRAINT "shippers_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suppliers" ADD CONSTRAINT "suppliers_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
