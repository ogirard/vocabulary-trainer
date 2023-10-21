import { MultipleChoiceQuestion } from "@/components/multiple-choice/multiple-choice-model";
import MultipleChoiceQuiz from "@/components/multiple-choice/multiple-choice-quiz";
import { shuffle } from "lodash";
import Link from "next/link";

function getRandom(exclude: number[], max = 20) {
  let result = Math.floor(Math.random() * max) + 1;
  while (exclude.includes(result)) {
    result = Math.floor(Math.random() * max) + 1;
  }
  return result;
}

function generateMultiplications(count: number): MultipleChoiceQuestion[] {
  const questions: MultipleChoiceQuestion[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i % 20) + 1;
    const b = getRandom([]);
    const c = getRandom([a, b]);
    const d = getRandom([a, b, c]);

    const answers = [
      {
        answerId: `${i}-1`,
        isCorrect: true,
        answerText: `${a * b}`,
      },
      {
        answerId: `${i}-2`,
        isCorrect: false,
        answerText: `${a * c}`,
      },
      {
        answerId: `${i}-3`,
        isCorrect: false,
        answerText: `${d * c}`,
      },
      {
        answerId: `${i}-4`,
        isCorrect: false,
        answerText: `${a * d}`,
      },
    ];

    const question: MultipleChoiceQuestion = {
      questionId: i,
      questionText: `${a} x ${b} = ?`,
      answers: shuffle(answers),
    };

    questions.push(question);
  }

  return questions;
}

export default function MathMultipleChoicePage({
  params,
}: {
  params: { count: string };
}) {
  const count = parseInt(params.count);
  const multipleChoiceQuestions = shuffle(generateMultiplications(count));
  return (
    <>
      <Link className="absolute left-5 top-5 text-blue-200" href="/">
        ❮ Zrügg zur Startsiitä
      </Link>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-6xl font-bold text-center text-blue-700 font-serif">
          MATH 1x1 - {count > 9000 ? "Ä HUFE" : `${count} MAL`}
        </h1>
        <MultipleChoiceQuiz multipleChoiceQuestions={multipleChoiceQuestions} />

        <div className="font-serif text-gray-400">
          {count > 9000 ? "Ganz vieli" : `${count}`} Rächnigä si parat ...
        </div>
      </main>
    </>
  );
}
