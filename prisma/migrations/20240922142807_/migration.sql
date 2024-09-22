-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_owner_id_fkey`;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
