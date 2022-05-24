/*
  Warnings:

  - A unique constraint covering the columns `[access_key]` on the table `invoices` will be added. If there are existing duplicate values, this will fail.
  - Made the column `access_key` on table `invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "access_key" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "invoices_access_key_key" ON "invoices"("access_key");
