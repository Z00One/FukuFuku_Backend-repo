/*
  Warnings:

  - The primary key for the `comment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `comment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `comment` table without a default value. This is not possible if the table is not empty.
  - Made the column `boardNo` on table `image` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `board` DROP FOREIGN KEY `FK_account_TO_board_1`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `FK_account_TO_comment_1`;

-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `FK_board_TO_comment_1`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `FK_board_TO_image_1`;

-- DropForeignKey
ALTER TABLE `image` DROP FOREIGN KEY `FK_memberOfTeam_TO_image_1`;

-- AlterTable
ALTER TABLE `board` MODIFY `hit` BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `comment` DROP PRIMARY KEY,
    ADD COLUMN `id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`, `boardNo`);

-- AlterTable
ALTER TABLE `image` MODIFY `boardNo` BIGINT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `comment_id_key` ON `comment`(`id`);

-- AddForeignKey
ALTER TABLE `board` ADD CONSTRAINT `board_writer_fkey` FOREIGN KEY (`writer`) REFERENCES `account`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_nickname_fkey` FOREIGN KEY (`nickname`) REFERENCES `account`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `comment_boardNo_fkey` FOREIGN KEY (`boardNo`) REFERENCES `board`(`boardNo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_boardNo_fkey` FOREIGN KEY (`boardNo`) REFERENCES `board`(`boardNo`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `image_memberBoardNo_fkey` FOREIGN KEY (`memberBoardNo`) REFERENCES `memberofteam`(`memberBoardNo`) ON DELETE CASCADE ON UPDATE CASCADE;
