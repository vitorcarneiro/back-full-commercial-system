/*
  Warnings:

  - You are about to drop the column `fcp` on the `invoice_infos` table. All the data in the column will be lost.
  - You are about to drop the column `icms` on the `invoice_infos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "invoice_infos" DROP COLUMN "fcp",
DROP COLUMN "icms",
ADD COLUMN     "fcp_st" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "icms_st" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "issue_date" SET DATA TYPE TEXT;
