/*
  Warnings:

  - The primary key for the `memberimage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `memberimage` table. All the data in the column will be lost.
  - The primary key for the `postimage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `postimage` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `memberImage` table without a default value. This is not possible if the table is not empty.
  - Made the column `memberBoardNo` on table `memberimage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `memberImage` DROP FOREIGN KEY `memberImage_memberBoardNo_fkey`;

-- AlterTable
ALTER TABLE `memberImage` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `fileName` VARCHAR(100) NOT NULL,
    MODIFY `memberBoardNo` BIGINT NOT NULL,
    ADD PRIMARY KEY (`fileName`);

-- AlterTable
ALTER TABLE `postImage` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`fileName`);

-- AddForeignKey
ALTER TABLE `memberImage` ADD CONSTRAINT `memberImage_memberBoardNo_fkey` FOREIGN KEY (`memberBoardNo`) REFERENCES `memberofteam`(`memberBoardNo`) ON DELETE CASCADE ON UPDATE CASCADE;
