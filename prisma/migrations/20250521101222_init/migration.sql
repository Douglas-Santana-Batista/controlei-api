-- CreateEnum
CREATE TYPE "TipoPagamento" AS ENUM ('DEBITO', 'CREDITO');

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "cpf" TEXT,
    "nome" TEXT,
    "senha" TEXT,
    "email" TEXT,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id_categoria" SERIAL NOT NULL,
    "descricao_categoria" TEXT NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "subcategorias" (
    "id_subcategoria" SERIAL NOT NULL,
    "descricao_subcategoria" TEXT NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,

    CONSTRAINT "subcategorias_pkey" PRIMARY KEY ("id_subcategoria")
);

-- CreateTable
CREATE TABLE "despesas" (
    "id_despesa" SERIAL NOT NULL,
    "data_da_despesa" TIMESTAMP(3),
    "descricao_despesa" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "parcela" TEXT,
    "tipo_pagamento" "TipoPagamento" NOT NULL DEFAULT 'DEBITO',
    "id_usuario" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "subcategoriasId_subcategoria" INTEGER,

    CONSTRAINT "despesas_pkey" PRIMARY KEY ("id_despesa")
);

-- CreateTable
CREATE TABLE "receitas" (
    "id_receita" SERIAL NOT NULL,
    "data_da_receita" TIMESTAMP(3),
    "descricao_receitas" TEXT,
    "valor" DOUBLE PRECISION NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "subcategoriasId_subcategoria" INTEGER,

    CONSTRAINT "receitas_pkey" PRIMARY KEY ("id_receita")
);

-- CreateTable
CREATE TABLE "parcelas" (
    "id_parcelas" SERIAL NOT NULL,
    "data_da_parcela" TIMESTAMP(3),
    "numero_da_parcela" INTEGER NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_receitas" INTEGER NOT NULL,
    "id_despesas" INTEGER NOT NULL,

    CONSTRAINT "parcelas_pkey" PRIMARY KEY ("id_parcelas")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_cpf_key" ON "usuarios"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "categorias" ADD CONSTRAINT "categorias_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategorias" ADD CONSTRAINT "subcategorias_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id_categoria") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subcategorias" ADD CONSTRAINT "subcategorias_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id_categoria") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "despesas" ADD CONSTRAINT "despesas_subcategoriasId_subcategoria_fkey" FOREIGN KEY ("subcategoriasId_subcategoria") REFERENCES "subcategorias"("id_subcategoria") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id_categoria") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "receitas" ADD CONSTRAINT "receitas_subcategoriasId_subcategoria_fkey" FOREIGN KEY ("subcategoriasId_subcategoria") REFERENCES "subcategorias"("id_subcategoria") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuarios"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_id_receitas_fkey" FOREIGN KEY ("id_receitas") REFERENCES "receitas"("id_receita") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "parcelas" ADD CONSTRAINT "parcelas_id_despesas_fkey" FOREIGN KEY ("id_despesas") REFERENCES "despesas"("id_despesa") ON DELETE RESTRICT ON UPDATE CASCADE;
