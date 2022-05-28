/*
  Warnings:

  - You are about to drop the column `authorId` on the `food` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[userId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `writerId` to the `food` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `food` DROP FOREIGN KEY `food_authorId_fkey`;

-- AlterTable
ALTER TABLE `food` DROP COLUMN `authorId`,
    ADD COLUMN `writerId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `user_userId_key` ON `user`(`userId`);

-- AddForeignKey
ALTER TABLE `food` ADD CONSTRAINT `food_writerId_fkey` FOREIGN KEY (`writerId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
