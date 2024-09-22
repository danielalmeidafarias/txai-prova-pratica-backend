/*
  Warnings:

  - You are about to drop the column `product_pic_url` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `product_pic_url`;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('MASTER', 'ADMIN', 'USER') NOT NULL;
