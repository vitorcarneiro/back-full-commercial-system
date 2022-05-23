/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `shippers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shippers_cnpj_key" ON "shippers"("cnpj");
