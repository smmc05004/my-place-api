/*
  Warnings:

  - You are about to drop the column `foodId` on the `attach` table. All the data in the column will be lost.
  - Added the required column `typeId` to the `attach` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `attach` DROP FOREIGN KEY `attach_foodId_fkey`;

-- AlterTable
ALTER TABLE `attach` DROP COLUMN `foodId`,
    ADD COLUMN `typeId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `attach` ADD CONSTRAINT `attach_typeId_fkey` FOREIGN KEY (`typeId`) REFERENCES `food`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
