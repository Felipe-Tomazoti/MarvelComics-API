-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "postedDate" TIMESTAMP(3) NOT NULL,
    "cover" TEXT NOT NULL,

    CONSTRAINT "Comic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "function" TEXT NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToComic" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ComicToCreator" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Character_id_key" ON "Character"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Comic_id_key" ON "Comic"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Creator_id_key" ON "Creator"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CharacterToComic_AB_unique" ON "_CharacterToComic"("A", "B");

-- CreateIndex
CREATE INDEX "_CharacterToComic_B_index" ON "_CharacterToComic"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ComicToCreator_AB_unique" ON "_ComicToCreator"("A", "B");

-- CreateIndex
CREATE INDEX "_ComicToCreator_B_index" ON "_ComicToCreator"("B");

-- AddForeignKey
ALTER TABLE "_CharacterToComic" ADD CONSTRAINT "_CharacterToComic_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToComic" ADD CONSTRAINT "_CharacterToComic_B_fkey" FOREIGN KEY ("B") REFERENCES "Comic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComicToCreator" ADD CONSTRAINT "_ComicToCreator_A_fkey" FOREIGN KEY ("A") REFERENCES "Comic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ComicToCreator" ADD CONSTRAINT "_ComicToCreator_B_fkey" FOREIGN KEY ("B") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;
