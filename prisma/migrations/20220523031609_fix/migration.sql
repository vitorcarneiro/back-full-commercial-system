/*
  Warnings:

  - You are about to drop the column `uf` on the `suppliers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "suppliers" DROP COLUMN "uf",
ALTER COLUMN "trade_name" DROP NOT NULL;
