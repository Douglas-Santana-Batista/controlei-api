/*
  Warnings:

  - You are about to drop the column `subcategoriasId_subcategoria` on the `despesas` table. All the data in the column will be lost.
  - You are about to drop the column `subcategoriasId_subcategoria` on the `receitas` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "despesas" DROP CONSTRAINT "despesas_subcategoriasId_subcategoria_fkey";

-- DropForeignKey
ALTER TABLE "receitas" DROP CONSTRAINT "receitas_subcategoriasId_subcategoria_fkey";

-- AlterTable
ALTER TABLE "despesas" DROP COLUMN "subcategoriasId_subcategoria",
ADD COLUMN     "id_subcategoria" INTEGER;

-- AlterTable
ALTER TABLE "receitas" DROP COLUMN "subcategoriasId_subcategoria",
ADD COLUMN     "id_subcategoria" INTEGER;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_id_subcategoria_fkey" FOREIGN KEY ("id_subcategoria") REFERENCES "subcategorias"("id_subcategoria") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_id_subcategoria_fkey" FOREIGN KEY ("id_subcategoria") REFERENCES "subcategorias"("id_subcategoria") ON DELETE SET NULL ON UPDATE CASCADE;
