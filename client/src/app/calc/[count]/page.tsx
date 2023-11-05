'use client';

import { QuestionAnswer } from '@/components/question-answer/question-answer-model';
import { shuffle } from 'lodash';
import Link from 'next/link';
import MathQuestionAnswerQuiz from './math-question-answer-quiz';
import { useSearchParams } from 'next/navigation';

function getRandom(exclude: number[], from = 1, to = 20) {
  let result = Math.floor(Math.random() * (to - from - 1)) + from;
  while (exclude.includes(result)) {
    result = Math.floor(Math.random() * (to - from - 1)) + from;
  }
  return result;
}

function generateMultiplications(
  count: number,
  inclFrom: number,
  inclTo: number
): QuestionAnswer[] {
  const questions: QuestionAnswer[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i % (inclTo - inclFrom - 1)) + 1;
    const b = getRandom([], inclFrom, inclTo);

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
  const searchParams = useSearchParams();
  const inclFrom = parseInt(searchParams.get('from') || '1');
  const inclTo = parseInt(searchParams.get('to') || '20');
  const count = parseInt(params.count);
  const questions = shuffle(generateMultiplications(count, inclFrom, inclTo));

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
