-- DropForeignKey
ALTER TABLE `despesas` DROP FOREIGN KEY `despesas_id_categoria_fkey`;

-- DropForeignKey
ALTER TABLE `receitas` DROP FOREIGN KEY `receitas_id_categoria_fkey`;

-- DropForeignKey
ALTER TABLE `subcategorias` DROP FOREIGN KEY `subcategorias_id_categoria_fkey`;

-- DropIndex
DROP INDEX `despesas_id_categoria_fkey` ON `despesas`;

-- DropIndex
DROP INDEX `receitas_id_categoria_fkey` ON `receitas`;

-- DropIndex
DROP INDEX `subcategorias_id_categoria_fkey` ON `subcategorias`;

-- AddForeignKey
ALTER TABLE `subcategorias` ADD CONSTRAINT `subcategorias_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `despesas` ADD CONSTRAINT `despesas_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receitas` ADD CONSTRAINT `receitas_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categorias`(`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE;
