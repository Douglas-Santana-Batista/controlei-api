-- AlterTable
ALTER TABLE `despesas` ADD COLUMN `tipo_pagamento` ENUM('DEBITO', 'CREDITO') NOT NULL DEFAULT 'DEBITO';
