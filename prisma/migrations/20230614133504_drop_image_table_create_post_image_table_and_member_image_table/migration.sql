/*
  Warnings:

  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_boardNo_fkey`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `image_memberBoardNo_fkey`;

-- DropTable
DROP TABLE `image`;

-- CreateTable
CREATE TABLE `memberImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `memberBoardNo` BIGINT NULL,

    UNIQUE INDEX `memberImage_memberBoardNo_key`(`memberBoardNo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `postImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `boardNo` BIGINT NOT NULL,
    `fileName` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `memberImage` ADD CONSTRAINT `memberImage_memberBoardNo_fkey` FOREIGN KEY (`memberBoardNo`) REFERENCES `memberofteam`(`memberBoardNo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postImage` ADD CONSTRAINT `postImage_boardNo_fkey` FOREIGN KEY (`boardNo`) REFERENCES `board`(`boardNo`) ON DELETE CASCADE ON UPDATE CASCADE;
