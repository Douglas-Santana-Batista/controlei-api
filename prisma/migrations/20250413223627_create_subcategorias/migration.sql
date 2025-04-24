-- AlterTable
ALTER TABLE `despesas` ADD COLUMN `subcategoriasId_subcategoria` INTEGER NULL;

-- AlterTable
ALTER TABLE `receitas` ADD COLUMN `subcategoriasId_subcategoria` INTEGER NULL;

-- CreateTable
CREATE TABLE `subcategorias` (
    `id_subcategoria` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao_subcategoria` VARCHAR(191) NOT NULL,
    `id_categoria` INTEGER NOT NULL,
    `id_usuario` INTEGER NOT NULL,

    PRIMARY KEY (`id_subcategoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `subcategorias` ADD CONSTRAINT `subcategorias_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id_categoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategorias` ADD CONSTRAINT `subcategorias_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `despesas` ADD CONSTRAINT `despesas_subcategoriasId_subcategoria_fkey` FOREIGN KEY (`subcategoriasId_subcategoria`) REFERENCES `subcategorias`(`id_subcategoria`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receitas` ADD CONSTRAINT `receitas_subcategoriasId_subcategoria_fkey` FOREIGN KEY (`subcategoriasId_subcategoria`) REFERENCES `subcategorias`(`id_subcategoria`) ON DELETE SET NULL ON UPDATE CASCADE;
