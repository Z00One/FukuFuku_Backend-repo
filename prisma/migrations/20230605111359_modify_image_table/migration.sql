/*
  Warnings:

  - The primary key for the `image` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `userPassword` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `image` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `fileName` VARCHAR(100) NOT NULL,
    ADD PRIMARY KEY (`id`);
