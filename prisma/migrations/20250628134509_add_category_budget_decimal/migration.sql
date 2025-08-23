/*
  Warnings:

  - You are about to alter the column `budget` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "budget" SET DATA TYPE DECIMAL(65,30);
