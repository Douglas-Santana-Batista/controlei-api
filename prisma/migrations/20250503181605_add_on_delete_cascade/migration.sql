-- DropForeignKey
ALTER TABLE `categorias` DROP FOREIGN KEY `categorias_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `despesas` DROP FOREIGN KEY `despesas_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `parcelas` DROP FOREIGN KEY `parcelas_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `receitas` DROP FOREIGN KEY `receitas_id_usuario_fkey`;

-- DropForeignKey
ALTER TABLE `subcategorias` DROP FOREIGN KEY `subcategorias_id_usuario_fkey`;

-- DropIndex
DROP INDEX `categorias_id_usuario_fkey` ON `categorias`;

-- DropIndex
DROP INDEX `despesas_id_usuario_fkey` ON `despesas`;

-- DropIndex
DROP INDEX `parcelas_id_usuario_fkey` ON `parcelas`;

-- DropIndex
DROP INDEX `receitas_id_usuario_fkey` ON `receitas`;

-- DropIndex
DROP INDEX `subcategorias_id_usuario_fkey` ON `subcategorias`;

-- AddForeignKey
ALTER TABLE `categorias` ADD CONSTRAINT `categorias_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subcategorias` ADD CONSTRAINT `subcategorias_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `despesas` ADD CONSTRAINT `despesas_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receitas` ADD CONSTRAINT `receitas_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `parcelas` ADD CONSTRAINT `parcelas_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios`(`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
