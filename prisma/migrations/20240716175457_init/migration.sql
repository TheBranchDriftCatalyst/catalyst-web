-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCTQuestion" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "deckId" TEXT,

    CONSTRAINT "MCTQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MCTAnswer" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "MCTAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserQuestion" (
    "id" TEXT NOT NULL,
    "nextReview" TIMESTAMP(3) NOT NULL,
    "interval" INTEGER NOT NULL,
    "easeFactor" DOUBLE PRECISION NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "questionId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "UserQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Deck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "MCTAnswer_questionId_text_key" ON "MCTAnswer"("questionId", "text");

-- CreateIndex
CREATE UNIQUE INDEX "UserQuestion_userId_questionId_key" ON "UserQuestion"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "MCTQuestion" ADD CONSTRAINT "MCTQuestion_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MCTAnswer" ADD CONSTRAINT "MCTAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "MCTQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestion" ADD CONSTRAINT "UserQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "MCTQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestion" ADD CONSTRAINT "UserQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deck" ADD CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
