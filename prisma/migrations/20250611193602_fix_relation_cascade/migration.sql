/*
  Warnings:

  - You are about to alter the column `amount` on the `Installment` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(10,2)`.
  - You are about to alter the column `value` on the `Subcategory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - You are about to drop the `_InstallmentToSubcategory` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_subcategory` to the `Installment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_InstallmentToSubcategory" DROP CONSTRAINT "_InstallmentToSubcategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_InstallmentToSubcategory" DROP CONSTRAINT "_InstallmentToSubcategory_B_fkey";

-- AlterTable
ALTER TABLE "Installment" ADD COLUMN     "id_subcategory" INTEGER NOT NULL,
ALTER COLUMN "amount" SET DATA TYPE DECIMAL(10,2);

-- AlterTable
ALTER TABLE "Subcategory" ALTER COLUMN "financial_flow" SET DEFAULT 'EXIT',
ALTER COLUMN "value" SET DATA TYPE DECIMAL(10,2);

-- DropTable
DROP TABLE "_InstallmentToSubcategory";

-- AddForeignKey
ALTER TABLE "Installment" ADD CONSTRAINT "Installment_id_subcategory_fkey" FOREIGN KEY ("id_subcategory") REFERENCES "Subcategory"("id_subcategory") ON DELETE CASCADE ON UPDATE CASCADE;
