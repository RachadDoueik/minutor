/*
  Warnings:

  - You are about to drop the `Feature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FeatureToRoom` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FeatureToRoom" DROP CONSTRAINT "_FeatureToRoom_A_fkey";

-- DropForeignKey
ALTER TABLE "_FeatureToRoom" DROP CONSTRAINT "_FeatureToRoom_B_fkey";

-- DropTable
DROP TABLE "Feature";

-- DropTable
DROP TABLE "_FeatureToRoom";

-- CreateTable
CREATE TABLE "RoomFeature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RoomFeature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RoomToRoomFeature" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_RoomToRoomFeature_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RoomToRoomFeature_B_index" ON "_RoomToRoomFeature"("B");

-- AddForeignKey
ALTER TABLE "_RoomToRoomFeature" ADD CONSTRAINT "_RoomToRoomFeature_A_fkey" FOREIGN KEY ("A") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoomToRoomFeature" ADD CONSTRAINT "_RoomToRoomFeature_B_fkey" FOREIGN KEY ("B") REFERENCES "RoomFeature"("id") ON DELETE CASCADE ON UPDATE CASCADE;
