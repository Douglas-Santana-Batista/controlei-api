-- DropForeignKey
ALTER TABLE "installments" DROP CONSTRAINT "installments_id_expenses_fkey";

-- DropForeignKey
ALTER TABLE "installments" DROP CONSTRAINT "installments_id_revenues_fkey";

-- AlterTable
ALTER TABLE "installments" ALTER COLUMN "id_revenues" DROP NOT NULL,
ALTER COLUMN "id_expenses" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_id_revenues_fkey" FOREIGN KEY ("id_revenues") REFERENCES "revenues"("id_revenues") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_id_expenses_fkey" FOREIGN KEY ("id_expenses") REFERENCES "expenses"("id_expense") ON DELETE SET NULL ON UPDATE CASCADE;
