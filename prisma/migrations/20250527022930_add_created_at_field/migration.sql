/*
  Warnings:

  - The `parcela` column on the `despesas` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `data_da_despesa` on table `despesas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_da_parcela` on table `parcelas` required. This step will fail if there are existing NULL values in that column.
  - Made the column `data_da_receita` on table `receitas` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "despesas" ALTER COLUMN "data_da_despesa" SET NOT NULL,
ALTER COLUMN "data_da_despesa" SET DEFAULT CURRENT_DATE,
DROP COLUMN "parcela",
ADD COLUMN     "parcela" INTEGER;

-- AlterTable
ALTER TABLE "parcelas" ALTER COLUMN "data_da_parcela" SET NOT NULL,
ALTER COLUMN "data_da_parcela" SET DEFAULT CURRENT_DATE;

-- AlterTable
ALTER TABLE "receitas" ALTER COLUMN "data_da_receita" SET NOT NULL,
ALTER COLUMN "data_da_receita" SET DEFAULT CURRENT_DATE;
