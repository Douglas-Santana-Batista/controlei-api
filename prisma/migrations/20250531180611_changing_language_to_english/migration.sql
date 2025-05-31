/*
  Warnings:

  - The primary key for the `parcelas` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data_da_parcela` on the `parcelas` table. All the data in the column will be lost.
  - You are about to drop the column `id_despesas` on the `parcelas` table. All the data in the column will be lost.
  - You are about to drop the column `id_parcelas` on the `parcelas` table. All the data in the column will be lost.
  - You are about to drop the column `id_receitas` on the `parcelas` table. All the data in the column will be lost.
  - You are about to drop the column `id_usuario` on the `parcelas` table. All the data in the column will be lost.
  - You are about to drop the column `numero_da_parcela` on the `parcelas` table. All the data in the column will be lost.
  - You are about to drop the `categorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `despesas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `receitas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `subcategorias` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuarios` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_expenses` to the `parcelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_revenues` to the `parcelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_user` to the `parcelas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installments_number` to the `parcelas` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "paymentType" AS ENUM ('CREDITO', 'DEBITO', 'BOLETO', 'PIX');

-- DropForeignKey
ALTER TABLE "categorias" DROP CONSTRAINT "categorias_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_id_subcategoria_fkey";

-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "parcelas" DROP CONSTRAINT "parcelas_id_despesas_fkey";

-- DropForeignKey
ALTER TABLE "parcelas" DROP CONSTRAINT "parcelas_id_receitas_fkey";

-- DropForeignKey
ALTER TABLE "parcelas" DROP CONSTRAINT "parcelas_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "receitas" DROP CONSTRAINT "receitas_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "receitas" DROP CONSTRAINT "receitas_id_subcategoria_fkey";

-- DropForeignKey
ALTER TABLE "receitas" DROP CONSTRAINT "receitas_id_usuario_fkey";

-- DropForeignKey
ALTER TABLE "subcategorias" DROP CONSTRAINT "subcategorias_id_categoria_fkey";

-- DropForeignKey
ALTER TABLE "subcategorias" DROP CONSTRAINT "subcategorias_id_usuario_fkey";

-- AlterTable
ALTER TABLE "parcelas" DROP CONSTRAINT "parcelas_pkey",
DROP COLUMN "data_da_parcela",
DROP COLUMN "id_despesas",
DROP COLUMN "id_parcelas",
DROP COLUMN "id_receitas",
DROP COLUMN "id_usuario",
DROP COLUMN "numero_da_parcela",
ADD COLUMN     "id_expenses" INTEGER NOT NULL,
ADD COLUMN     "id_installments" SERIAL NOT NULL,
ADD COLUMN     "id_revenues" INTEGER NOT NULL,
ADD COLUMN     "id_user" INTEGER NOT NULL,
ADD COLUMN     "installments_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_DATE,
ADD COLUMN     "installments_number" INTEGER NOT NULL,
ADD CONSTRAINT "parcelas_pkey" PRIMARY KEY ("id_installments");

-- DropTable
DROP TABLE "categorias";

-- DropTable
DROP TABLE "despesas";

-- DropTable
DROP TABLE "receitas";

-- DropTable
DROP TABLE "subcategorias";

-- DropTable
DROP TABLE "usuarios";

-- DropEnum
DROP TYPE "TipoPagamento";

-- CreateTable
CREATE TABLE "user" (
    "id_user" SERIAL NOT NULL,
    "cpf" TEXT,
    "name" TEXT,
    "senha" TEXT,
    "email" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "categories" (
    "id_category" SERIAL NOT NULL,
    "category_description" TEXT NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id_category")
);

-- CreateTable
CREATE TABLE "subcategories" (
    "id_subcategories" SERIAL NOT NULL,
    "subcategory_description" TEXT NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "subcategories_pkey" PRIMARY KEY ("id_subcategories")
);

-- CreateTable
CREATE TABLE "expenses" (
    "id_expense" SERIAL NOT NULL,
    "expense_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_DATE,
    "expense_description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "Installments" INTEGER,
    "payment_type" "paymentType" NOT NULL DEFAULT 'DEBITO',
    "id_user" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_subcategories" INTEGER,

    CONSTRAINT "expenses_pkey" PRIMARY KEY ("id_expense")
);

-- CreateTable
CREATE TABLE "revenues" (
    "id_revenues" SERIAL NOT NULL,
    "revenue_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_DATE,
    "revenue_description" TEXT,
    "value" DOUBLE PRECISION NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_category" INTEGER NOT NULL,
    "id_subcategories" INTEGER,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id_revenues")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cpf_key" ON "user"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategories" ADD CONSTRAINT "subcategories_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_id_subcategories_fkey" FOREIGN KEY ("id_subcategories") REFERENCES "subcategories"("id_subcategories") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenues" ADD CONSTRAINT "revenues_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenues" ADD CONSTRAINT "revenues_id_category_fkey" FOREIGN KEY ("id_category") REFERENCES "categories"("id_category") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "revenues" ADD CONSTRAINT "revenues_id_subcategories_fkey" FOREIGN KEY ("id_subcategories") REFERENCES "subcategories"("id_subcategories") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_id_revenues_fkey" FOREIGN KEY ("id_revenues") REFERENCES "revenues"("id_revenues") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_id_expenses_fkey" FOREIGN KEY ("id_expenses") REFERENCES "expenses"("id_expense") ON DELETE RESTRICT ON UPDATE CASCADE;
