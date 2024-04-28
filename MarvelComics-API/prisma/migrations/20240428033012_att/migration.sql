/*
  Warnings:

  - You are about to drop the `_CharacterToComic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ComicToCreator` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CharacterToComic" DROP CONSTRAINT "_CharacterToComic_A_fkey";

-- DropForeignKey
ALTER TABLE "_CharacterToComic" DROP CONSTRAINT "_CharacterToComic_B_fkey";

-- DropForeignKey
ALTER TABLE "_ComicToCreator" DROP CONSTRAINT "_ComicToCreator_A_fkey";

-- DropForeignKey
ALTER TABLE "_ComicToCreator" DROP CONSTRAINT "_ComicToCreator_B_fkey";

-- DropTable
DROP TABLE "_CharacterToComic";

-- DropTable
DROP TABLE "_ComicToCreator";
