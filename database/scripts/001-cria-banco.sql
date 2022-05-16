CREATE TABLE "user" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"email" TEXT NOT NULL UNIQUE,
	"cpf" char(11) NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"full_name" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "product_category" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modified_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "product_subcategory" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"category_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("category_id") REFERENCES "product_category"("id")
);

CREATE TABLE "brand" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "product" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"sale_price" INTEGER NOT NULL,
	"sku" TEXT NOT NULL UNIQUE,
	"barcode" TEXT,
	"measurement_unit" TEXT NOT NULL,
	"allowed_fraction" BOOLEAN NOT NULL DEFAULT FALSE,
	"category_id" INTEGER DEFAULT NULL,
	"subcategory_id" INTEGER,
	"changed_by" INTEGER,
	"brand_id" INTEGER NOT NULL,
	"allowed_price_change" BOOLEAN NOT NULL DEFAULT FALSE,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modified_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("category_id") REFERENCES "product_category"("id"),
	FOREIGN KEY ("subcategory_id") REFERENCES "product_subcategory"("id"),
	FOREIGN KEY ("changed_by") REFERENCES "user"("id"),
	FOREIGN KEY ("brand_id") REFERENCES "brand"("id"),
	FOREIGN KEY ("category_id") REFERENCES "product_category"("id")
);

CREATE TABLE "measurement_relation" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"product_id" INTEGER NOT NULL,
	"unit1_name" TEXT NOT NULL,
	"unit1_quantity" INTEGER NOT NULL,
	"unit2_name" TEXT NOT NULL,
	"unit2_quantity" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modified_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("product_id") REFERENCES "product"("id")
);

CREATE TABLE "product_key_word" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL,
	"product_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("product_id") REFERENCES "product"("id")
);

CREATE TABLE "product_inventory" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"quantity" INTEGER,
	"monthly_quantity" INTEGER,
	"min_quantity" INTEGER DEFAULT 2,
	"measurement_unit" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modified_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"product_id" INTEGER NOT NULL,

	FOREIGN KEY ("product_id") REFERENCES "product"("id")
);

CREATE TABLE "product_info" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"product_id" INTEGER NOT NULL,
	"description" TEXT,
	"image_path" TEXT,
	"gross_weight" INTEGER,
	"location" TEXT,
	"net_weight" INTEGER,
	"ncm" TEXT,
	"cest" TEXT,
	"tributation_code" TEXT DEFAULT NULL,

	FOREIGN KEY ("product_id") REFERENCES "product"("id")
);

CREATE TABLE "adress" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"cep" TEXT NOT NULL,
	"address" TEXT NOT NULL,
	"number" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"complement" TEXT,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE "supplier" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"cnpj" char(14) NOT NULL,
	"company_name" TEXT,
	"trade_name" TEXT NOT NULL,
	"state_registration" TEXT DEFAULT NULL,
	"state_registration_subst" TEXT DEFAULT NULL,
	"type" TEXT,
	"uf" TEXT,
	"phone_number" TEXT,
	"email" TEXT,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"adress_id" INTEGER,
	"modified_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("adress_id") REFERENCES "adress"("id")
);

CREATE TABLE "shipper" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"cnpj" char(14) NOT NULL,
	"company_name" TEXT,
	"trade_name" TEXT NOT NULL,
	"state_code" TEXT DEFAULT NULL,
	"state_code_subst" TEXT DEFAULT NULL,
	"type" TEXT,
	"uf" TEXT,
	"phone_number" TEXT,
	"email" TEXT,
	"adress_id" INTEGER,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
	"modified_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("adress_id") REFERENCES "adress"("id")
);

CREATE TABLE "salesperson" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"name" TEXT NOT NULL UNIQUE,
	"phone_number" TEXT,
	"supplier_id" INTEGER NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id")
);

CREATE TABLE "invoice" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"access_key" TEXT,
	"supplier_id" INTEGER NOT NULL,
	"products_cost" INTEGER NOT NULL,
	"total_cost" INTEGER,
	"installments_quantity" INTEGER NOT NULL,
	"salesperson_id" INTEGER,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("supplier_id") REFERENCES "supplier"("id")
);

CREATE TABLE "payment" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"invoice_id" INTEGER NOT NULL,
	"value" INTEGER NOT NULL,
	"due_date" DATE NOT NULL,
	"installment_number" INTEGER NOT NULL DEFAULT 1,
	"bank_description" TEXT DEFAULT NULL,
	"obs" TEXT,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id")
);

CREATE TABLE "invoice_info" (
	"id" SERIAL NOT NULL PRIMARY KEY,
	"invoice_id" INTEGER NOT NULL,
	"number" TEXT NOT NULL,
	"serie" TEXT,
	"ipi" INTEGER NOT NULL DEFAULT 0,
	"icms" INTEGER NOT NULL DEFAULT 0,
	"fcp" INTEGER NOT NULL DEFAULT 0,
	"shipping" INTEGER NOT NULL DEFAULT 0,
	"shipper_id" INTEGER DEFAULT NULL,
	"discount" INTEGER NOT NULL DEFAULT 0,
	"issue_date" DATE NOT NULL,
	"others_expenses" INTEGER NOT NULL DEFAULT 0,
	"obs" TEXT NOT NULL,
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id"),
	FOREIGN KEY ("shipper_id") REFERENCES "shipper"("id")
);

CREATE TABLE "product_invoice" (
	"id" SERIAL NOT NULL PRIMARY KEY,
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
	"created_at" TIMESTAMP NOT NULL DEFAULT NOW(),

	FOREIGN KEY ("product_id") REFERENCES "product"("id"),
	FOREIGN KEY ("invoice_id") REFERENCES "invoice"("id")
);
