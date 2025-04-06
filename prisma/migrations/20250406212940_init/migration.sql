/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `cpf` VARCHAR(191) NULL,
    `nome` VARCHAR(191) NULL,
    `senha` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `Usuario_cpf_key`(`cpf`),
    UNIQUE INDEX `Usuario_senha_key`(`senha`),
    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao_categoria` VARCHAR(191) NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Despesa` (
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
CREATE TABLE `Receita` (
    `id_receita` INTEGER NOT NULL AUTO_INCREMENT,
    `data_da_receita` DATETIME(3) NULL,
    `descricao_receitas` VARCHAR(191) NULL,
    `valor` DOUBLE NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_categoria` INTEGER NOT NULL,

    PRIMARY KEY (`id_receita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parcela` (
    `id_parcelas` INTEGER NOT NULL AUTO_INCREMENT,
    `data_da_parcela` DATETIME(3) NULL,
    `numero_da_parcela` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,
    `id_receitas` INTEGER NOT NULL,
    `id_despesas` INTEGER NOT NULL,

    PRIMARY KEY (`id_parcelas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Categoria` ADD CONSTRAINT `Categoria_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Despesa` ADD CONSTRAINT `Despesa_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Despesa` ADD CONSTRAINT `Despesa_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receita` ADD CONSTRAINT `Receita_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Receita` ADD CONSTRAINT `Receita_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `Categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parcela` ADD CONSTRAINT `Parcela_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `Usuario`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parcela` ADD CONSTRAINT `Parcela_id_receitas_fkey` FOREIGN KEY (`id_receitas`) REFERENCES `Receita`(`id_receita`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Parcela` ADD CONSTRAINT `Parcela_id_despesas_fkey` FOREIGN KEY (`id_despesas`) REFERENCES `Despesa`(`id_despesa`) ON DELETE RESTRICT ON UPDATE CASCADE;
