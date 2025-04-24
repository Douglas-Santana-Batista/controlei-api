/*
  Warnings:

  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Despesa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Parcela` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Receita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Categoria` DROP FOREIGN KEY `Categoria_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `Despesa` DROP FOREIGN KEY `Despesa_id_categoria_fkey`;

-- DropForeignKey
ALTER TABLE `Despesa` DROP FOREIGN KEY `Despesa_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `Parcela` DROP FOREIGN KEY `Parcela_id_despesas_fkey`;

-- DropForeignKey
ALTER TABLE `Parcela` DROP FOREIGN KEY `Parcela_id_receitas_fkey`;

-- DropForeignKey
ALTER TABLE `Parcela` DROP FOREIGN KEY `Parcela_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `Receita` DROP FOREIGN KEY `Receita_id_categoria_fkey`;

-- DropForeignKey
ALTER TABLE `Receita` DROP FOREIGN KEY `Receita_id_usuario_fkey`;

-- DropTable
DROP TABLE `Categoria`;

-- DropTable
DROP TABLE `Despesa`;

-- DropTable
DROP TABLE `Parcela`;

-- DropTable
DROP TABLE `Receita`;

-- DropTable
DROP TABLE `Usuario`;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(191) NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `usuarios_cpf_key`(`cpf`),
    UNIQUE INDEX `usuarios_senha_key`(`senha`),
    UNIQUE INDEX `usuarios_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao_categoria` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `despesas` (
    `id_despesa` INTEGER NOT NULL AUTO_INCREMENT,
    `data_da_despesa` DATETIME(3) NULL,
    `descricao_despesa` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `parcela` VARCHAR(191) NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    PRIMARY KEY (`id_despesa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receitas` (
    `id_receita` INTEGER NOT NULL AUTO_INCREMENT,
    `data_da_receita` DATETIME(3) NULL,
    `descricao_receitas` VARCHAR(191) NULL,
    `valor` DOUBLE NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    PRIMARY KEY (`id_receita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `parcelas` (
    `id_parcelas` INTEGER NOT NULL AUTO_INCREMENT,
    `data_da_parcela` DATETIME(3) NULL,
    `numero_da_parcela` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_receitas` INTEGER NOT NULL,
    `id_despesas` INTEGER NOT NULL,

    PRIMARY KEY (`id_parcelas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categorias` ADD CONSTRAINT `categorias_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `despesas` ADD CONSTRAINT `despesas_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `despesas` ADD CONSTRAINT `despesas_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receitas` ADD CONSTRAINT `receitas_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receitas` ADD CONSTRAINT `receitas_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parcelas` ADD CONSTRAINT `parcelas_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parcelas` ADD CONSTRAINT `parcelas_id_receitas_fkey` FOREIGN KEY (`id_receitas`) REFERENCES `receitas`(`id_receita`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parcelas` ADD CONSTRAINT `parcelas_id_despesas_fkey` FOREIGN KEY (`id_despesas`) REFERENCES `despesas`(`id_despesa`) ON DELETE RESTRICT ON UPDATE CASCADE;
