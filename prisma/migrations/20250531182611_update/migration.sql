/*
  Warnings:

  - You are about to drop the `parcelas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "parcelas" DROP CONSTRAINT "parcelas_id_expenses_fkey";

-- DropForeignKey
ALTER TABLE "parcelas" DROP CONSTRAINT "parcelas_id_revenues_fkey";

-- DropForeignKey
ALTER TABLE "parcelas" DROP CONSTRAINT "parcelas_id_user_fkey";

-- DropTable
DROP TABLE "parcelas";

-- CreateTable
CREATE TABLE "installments" (
    "id_installments" SERIAL NOT NULL,
    "installments_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_DATE,
    "installments_number" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_revenues" INTEGER NOT NULL,
    "id_expenses" INTEGER NOT NULL,

    CONSTRAINT "installments_pkey" PRIMARY KEY ("id_installments")
);

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_id_revenues_fkey" FOREIGN KEY ("id_revenues") REFERENCES "revenues"("id_revenues") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "installments" ADD CONSTRAINT "installments_id_expenses_fkey" FOREIGN KEY ("id_expenses") REFERENCES "expenses"("id_expense") ON DELETE RESTRICT ON UPDATE CASCADE;
