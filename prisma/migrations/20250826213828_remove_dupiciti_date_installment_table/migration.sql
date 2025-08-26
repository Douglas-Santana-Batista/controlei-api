/*
  Warnings:

  - You are about to drop the column `due_date` on the `Installment` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Subcategory` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."idx_installment_due_date";

-- DropIndex
DROP INDEX "public"."idx_expense_date";

-- DropIndex
DROP INDEX "public"."idx_user_date";

-- AlterTable
ALTER TABLE "public"."Installment" DROP COLUMN "due_date";

-- AlterTable
ALTER TABLE "public"."Subcategory" DROP COLUMN "date";
