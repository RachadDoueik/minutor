/*
  Warnings:

  - You are about to drop the column `location` on the `Room` table. All the data in the column will be lost.
  - Added the required column `building` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "location",
ADD COLUMN     "building" TEXT NOT NULL,
ADD COLUMN     "floor" INTEGER NOT NULL;
