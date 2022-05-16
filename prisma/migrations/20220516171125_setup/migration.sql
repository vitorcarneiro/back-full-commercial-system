-- CreateTable
CREATE TABLE "adress" (
    "id" SERIAL NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "complement" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "brand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" SERIAL NOT NULL,
    "access_key" TEXT,
    "supplier_id" INTEGER NOT NULL,
    "products_cost" INTEGER NOT NULL,
    "total_cost" INTEGER,
    "installments_quantity" INTEGER NOT NULL,
    "salesperson_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_info" (
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

    CONSTRAINT "invoice_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "measurement_relation" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "unit1_name" TEXT NOT NULL,
    "unit1_quantity" INTEGER NOT NULL,
    "unit2_name" TEXT NOT NULL,
    "unit2_quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measurement_relation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "invoice_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL,
    "due_date" DATE NOT NULL,
    "installment_number" INTEGER NOT NULL DEFAULT 1,
    "bank_description" TEXT,
    "obs" TEXT,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
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

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_info" (
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

    CONSTRAINT "product_info_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_inventory" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER,
    "monthly_quantity" INTEGER,
    "min_quantity" INTEGER DEFAULT 2,
    "measurement_unit" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "product_inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_invoice" (
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

    CONSTRAINT "product_invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_key_word" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_key_word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_subcategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_subcategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salesperson" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT,
    "supplier_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "salesperson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipper" (
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
    "adress_id" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shipper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supplier" (
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
    "adress_id" INTEGER,
    "modified_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supplier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "cpf" CHAR(11) NOT NULL,
    "password" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_sku_key" ON "product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "salesperson_name_key" ON "salesperson"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoice_info" ADD CONSTRAINT "invoice_info_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invoice_info" ADD CONSTRAINT "invoice_info_shipper_id_fkey" FOREIGN KEY ("shipper_id") REFERENCES "shipper"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "measurement_relation" ADD CONSTRAINT "measurement_relation_prduct_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "brand"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_subcategory_id_fkey" FOREIGN KEY ("subcategory_id") REFERENCES "product_subcategory"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_changed_by_fkey" FOREIGN KEY ("changed_by") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_info" ADD CONSTRAINT "product_info_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_inventory" ADD CONSTRAINT "product_inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_invoice" ADD CONSTRAINT "product_invoice_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_invoice" ADD CONSTRAINT "product_invoice_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_key_word" ADD CONSTRAINT "product_key_word_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_subcategory" ADD CONSTRAINT "product_subcategory_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "salesperson" ADD CONSTRAINT "salesperson_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shipper" ADD CONSTRAINT "shipper_adress_id_fkey" FOREIGN KEY ("adress_id") REFERENCES "adress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "supplier" ADD CONSTRAINT "supplier_adress_id_fkey" FOREIGN KEY ("adress_id") REFERENCES "adress"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
