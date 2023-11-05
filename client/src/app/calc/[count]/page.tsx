import { QuestionAnswer } from '@/components/question-answer/question-answer-model';
import { shuffle } from 'lodash';
import Link from 'next/link';
import MathQuestionAnswerQuiz from './math-question-answer-quiz';

function getRandom(exclude: number[], max = 20) {
  let result = Math.floor(Math.random() * max) + 1;
  while (exclude.includes(result)) {
    result = Math.floor(Math.random() * max) + 1;
  }
  return result;
}

function generateMultiplications(count: number): QuestionAnswer[] {
  const questions: QuestionAnswer[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i % 20) + 1;
    const b = getRandom([]);

    const question: QuestionAnswer = {
      questionId: `question-${i}`,
      questionText: `${a} x ${b} = ?`,
      answerText: undefined,
      correctAnswer: `${a * b}`,
      isCorrect: false,
    };

    questions.push(question);
  }

  return questions;
}

export default function MathQuestionAnswerPage({
  params,
}: {
  params: { count: string };
}) {
  const count = parseInt(params.count);
  const questions = shuffle(generateMultiplications(count));

  return (
    <>
      <Link
        className='absolute left-5 top-5 text-blue-600 dark:text-blue-200'
        href='/'
      >
        ❮ Zrügg zur Startsiitä
      </Link>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <h1 className='text-center font-serif text-6xl font-bold text-blue-700'>
          MATH 1x1 - {count > 9000 ? 'Ä HUFE' : `${count} MAL`}
        </h1>
        <MathQuestionAnswerQuiz questions={questions} />
        <div className='font-serif text-gray-400'>
          {count > 9000 ? 'Ganz vieli' : `${count}`} Rächnigä si parat ...
        </div>
      </main>
    </>
  );
}
