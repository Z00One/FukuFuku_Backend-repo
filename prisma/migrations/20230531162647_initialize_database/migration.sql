-- CreateTable
CREATE TABLE `account` (
    `nickname` VARCHAR(10) NOT NULL,
    `userId` VARCHAR(10) NOT NULL,
    `userPassword` VARCHAR(10) NOT NULL,
    `isAdmin` BOOLEAN NULL,

    PRIMARY KEY (`nickname`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `board` (
    `boardNo` BIGINT NOT NULL AUTO_INCREMENT,
    `writer` VARCHAR(10) NOT NULL,
    `title` VARCHAR(20) NOT NULL,
    `content` TEXT NOT NULL,
    `hit` BIGINT NOT NULL,
    `writeDate` DATE NOT NULL,

    UNIQUE INDEX `board_boardNo_key`(`boardNo`),
    INDEX `FK_account_TO_board_1`(`writer`),
    PRIMARY KEY (`boardNo`, `writer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comment` (
    `boardNo` BIGINT NOT NULL,
    `nickname` VARCHAR(30) NOT NULL,
    `comment` TEXT NOT NULL,
    `commentDate` DATETIME(0) NOT NULL,

    INDEX `FK_account_TO_comment_1`(`nickname`),
    PRIMARY KEY (`boardNo`, `nickname`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `memberofteam` (
    `memberBoardNo` BIGINT NOT NULL AUTO_INCREMENT,
    `memberName` VARCHAR(20) NOT NULL,
    `introduceContent` TEXT NULL,

    PRIMARY KEY (`memberBoardNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `image` (
    `boardNo` BIGINT NULL,
    `memberBoardNo` BIGINT NULL,
    `fileName` VARCHAR(50) NOT NULL,

    INDEX `FK_board_TO_image_1`(`boardNo`),
    INDEX `FK_memberOfTeam_TO_image_1`(`memberBoardNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `board` ADD CONSTRAINT `FK_account_TO_board_1` FOREIGN KEY (`writer`) REFERENCES `account`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `FK_account_TO_comment_1` FOREIGN KEY (`nickname`) REFERENCES `account`(`nickname`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comment` ADD CONSTRAINT `FK_board_TO_comment_1` FOREIGN KEY (`boardNo`) REFERENCES `board`(`boardNo`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `FK_board_TO_image_1` FOREIGN KEY (`boardNo`) REFERENCES `board`(`boardNo`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `image` ADD CONSTRAINT `FK_memberOfTeam_TO_image_1` FOREIGN KEY (`memberBoardNo`) REFERENCES `memberofteam`(`memberBoardNo`) ON DELETE CASCADE ON UPDATE NO ACTION;
