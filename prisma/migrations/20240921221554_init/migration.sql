-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `nickname` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `profile_pic_url` VARCHAR(191) NOT NULL,
    `cpf` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_nickname_key`(`nickname`),
    UNIQUE INDEX `User_cpf_key`(`cpf`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `product_pic_url` VARCHAR(191) NULL,
    `owner_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_owner_id_fkey` FOREIGN KEY (`owner_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
