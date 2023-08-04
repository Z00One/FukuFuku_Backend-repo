/*
  Warnings:

  - A unique constraint covering the columns `[boardNo]` on the table `image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[memberBoardNo]` on the table `image` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `image` ADD PRIMARY KEY (`fileName`);

-- CreateIndex
CREATE UNIQUE INDEX `image_boardNo_key` ON `image`(`boardNo`);

-- CreateIndex
CREATE UNIQUE INDEX `image_memberBoardNo_key` ON `image`(`memberBoardNo`);
