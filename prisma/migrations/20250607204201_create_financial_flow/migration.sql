/*
  Warnings:

  - You are about to drop the column `id_expense` on the `Installment` table. All the data in the column will be lost.
  - You are about to drop the column `id_revenue` on the `Installment` table. All the data in the column will be lost.
  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Revenue` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `financial_flow` to the `Subcategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Subcategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Financial_Flow" AS ENUM ('ENTRY', 'EXIT');

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_id_category_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_id_subcategory_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_id_user_fkey";

-- DropForeignKey
ALTER TABLE "Installment" DROP CONSTRAINT "Installment_id_expense_fkey";

-- DropForeignKey
ALTER TABLE "Installment" DROP CONSTRAINT "Installment_id_revenue_fkey";

-- DropForeignKey
ALTER TABLE "Revenue" DROP CONSTRAINT "Revenue_id_category_fkey";

-- DropForeignKey
ALTER TABLE "Revenue" DROP CONSTRAINT "Revenue_id_subcategory_fkey";

-- DropForeignKey
ALTER TABLE "Revenue" DROP CONSTRAINT "Revenue_id_user_fkey";

-- DropIndex
DROP INDEX "idx_installment_expense";

-- DropIndex
DROP INDEX "idx_installment_revenue";

-- AlterTable
ALTER TABLE "Installment" DROP COLUMN "id_expense",
DROP COLUMN "id_revenue";

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "financial_flow" "Financial_Flow" NOT NULL,
ADD COLUMN     "payment_type" "PaymentType" NOT NULL DEFAULT 'DEBITO',
ADD COLUMN     "value" DECIMAL(65,30) NOT NULL;

-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "Revenue";

-- CreateTable
CREATE TABLE "_InstallmentToSubcategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_InstallmentToSubcategory_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_InstallmentToSubcategory_B_index" ON "_InstallmentToSubcategory"("B");

-- CreateIndex
CREATE INDEX "idx_expense_user" ON "Subcategory"("id_user");

-- CreateIndex
CREATE INDEX "idx_expense_date" ON "Subcategory"("date");

-- CreateIndex
CREATE INDEX "idx_user_date" ON "Subcategory"("id_user", "date");

-- CreateIndex
CREATE INDEX "idx_payment_type" ON "Subcategory"("payment_type");

-- AddForeignKey
ALTER TABLE "_InstallmentToSubcategory" ADD CONSTRAINT "_InstallmentToSubcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Installment"("id_installment") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InstallmentToSubcategory" ADD CONSTRAINT "_InstallmentToSubcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Subcategory"("id_subcategory") ON DELETE CASCADE ON UPDATE CASCADE;
