/*
  Warnings:

  - Added the required column `district` to the `addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "addresses" ADD COLUMN     "district" TEXT NOT NULL;
