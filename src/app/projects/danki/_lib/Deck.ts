import { PrismaClient, Deck as PrismaDeck, UserQuestion } from '@prisma/client';

class Deck {
  private prisma: PrismaClient;
  private userId: number;
  private deckId?: number;

  constructor(userId: number, deckId?: number) {
    this.prisma = new PrismaClient();
    this.userId = userId;
    this.deckId = deckId;
  }

  async createDeck(name: string): Promise<PrismaDeck> {
    const deck = await this.prisma.deck.create({
      data: {
        name,
        userId: this.userId,
      },
    });
    this.deckId = deck.id;
    return deck;
  }

  async addQuestionToDeck(questionId: number): Promise<void> {
    if (!this.deckId) throw new Error('Deck not set');

    await this.prisma.userQuestion.updateMany({
      where: {
        userId: this.userId,
        questionId,
      },
      data: {
        deckId: this.deckId,
      },
    });
  }

  async getReviewDeck(): Promise<UserQuestion[]> {
    if (!this.deckId) throw new Error('Deck not set');

    const now = new Date();
    const dueQuestions = await this.prisma.userQuestion.findMany({
      where: {
        userId: this.userId,
        deckId: this.deckId,
        nextReview: {
          lte: now,
        },
      },
      include: {
        question: {
          include: {
            answers: true,
          },
        },
      },
    });

    return dueQuestions;
  }
  
  async updateSpacedRepetition(userQuestionId: number, correct: boolean): Promise<void> {
    const userQuestion = await this.prisma.userQuestion.findUnique({
      where: { id: userQuestionId },
    });

    if (!userQuestion) {
      throw new Error('UserQuestion not found');
    }

    let { interval, easeFactor, repetitions, nextReview } = userQuestion;
    if (correct) {
      repetitions += 1;
      interval = Math.round(interval * easeFactor);
      easeFactor += 0.1;
    } else {
      repetitions = 1;
      interval = 1;
      easeFactor -= 0.2;
    }

    nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);

    await this.prisma.userQuestion.update({
      where: { id: userQuestionId },
      data: {
        interval,
        easeFactor,
        repetitions,
        nextReview,
      },
    });
  }
}

// // Usage example
// async function main() {
//   const userId = 1; // Replace with the actual user ID
//   const deck = new Deck(userId);

//   // Create a new deck
//   const newDeck = await deck.createDeck('My Review Deck');
//   console.log('New Deck:', newDeck);

//   // Add a question to the deck
//   await deck.addQuestionToDeck(1); // Replace with the actual question ID

//   // Get the review deck
//   const reviewDeck = await deck.getReviewDeck();
//   console.log('Review Deck:', reviewDeck);

//   // Simulate reviewing a question
//   if (reviewDeck.length > 0) {
//     await deck.updateSpacedRepetition(reviewDeck[0].id, true);
//   }
// }

// main()
//   .catch(e => {
//     console.error(e);
//   })
//   .finally(async () => {
//     const prisma = new PrismaClient();
//     await prisma.$disconnect();
//   });
