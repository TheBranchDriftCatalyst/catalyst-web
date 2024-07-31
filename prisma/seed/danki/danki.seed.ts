import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import { v4 as uuid } from "uuid";

// Define the regex pattern
const pattern =
  /(?:\d+\.\s)(?<question>.+?)(?<options>(?:\s*[a-dA-D]\)\s.*)+)/s;

// Read the file content
const content = fs.readFileSync("./prisma/seed/danki/insurance_qbank_1.txt", "utf-8");

// Split the content by double new lines to get individual questions
let questions = content.trim().split("\n\n");

// Create arrays to store parsed questions and answers
const parsedQuestions: any[] = [];
const parsedAnswers: any[] = [];

// Process each question block
questions.forEach((q, index) => {
  const match = pattern.exec(q);
  if (match && match.groups) {
    const questionText = match.groups.question.trim();
    const optionsRaw = match.groups.options
      .trim()
      .split("\n")
      .map((opt) => opt.trim());

    // Extract options and identify the correct answer
    const options = optionsRaw.map((opt) => {
      const isCorrect = /^[A-D]\)/.test(opt); // Check if the option starts with a capital letter
      return {
        text: opt.slice(3).trim(), // Remove the "a) " part from the option text
        isCorrect,
      };
    });

    // Add the question to parsedQuestions array
    const questionId = uuid();

    parsedQuestions.push({
      id: questionId,
      text: questionText,
      deckId: null,
    });

    // Add the options to parsedAnswers array
    options.forEach((opt) => {
      parsedAnswers.push({
        text: opt.text,
        isCorrect: opt.isCorrect,
        questionId: questionId,
      });
    });
  } else {
    console.log("No match found for question block:");
    console.log(q);
    console.log("---");
  }
});

export default async function seed(prisma: PrismaClient) {
  console.log("----------------------");
  console.log("Seeding Danki Project");
  console.log(`Questions: ${parsedQuestions.length}`);
  console.log(`Answers: ${parsedAnswers.length}`);
  console.log("----------------------");

  // TODO: create the deck and assign all questions to the deck
  const deck = prisma.deck.create({
    data: {
      name: "Insurance QBank 1",
      // description: "Insurance QBank 1",
    }
  })

  for (const question of parsedQuestions) {
    await prisma.mCTQuestion.create({data: question});
  }

  for (const answer of parsedAnswers) {
    await prisma.mCTAnswer.create({data: answer});
  }
}
