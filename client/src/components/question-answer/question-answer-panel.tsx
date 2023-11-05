'use client';

import { useEffect, useId, useRef, useState } from 'react';
import {
  QuestionAnswerEnteredEvent,
  NextQuestionAnswerLoadedEvent,
  QuestionAnswer,
} from './question-answer-model';
import WaitSpinner from '../wait-spinner';
import { useHotkey } from '@/hooks/useHotkey';

interface QuestionAnswerPanelProps {
  question: QuestionAnswer;
  currentNumber: number;
  totalNumber: number;
  evaluateAnswer: (answer: string, current: QuestionAnswer) => boolean;
}

const QuestionAnswerPanel = ({
  question,
  currentNumber,
  totalNumber,
  evaluateAnswer,
}: QuestionAnswerPanelProps) => {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>();
  const [input, setInput] = useState('');

  const [answer, setAnswer] = useState<{
    answerText: string;
    isCorrect: boolean;
  } | null>(null);

  const giveAnswer = () => {
    if (!input || input.trim() === '') {
      return;
    }

    question.answerText = input;
    question.isCorrect = evaluateAnswer(input, question);

    setAnswer({
      answerText: question.answerText,
      isCorrect: question.isCorrect,
    });

    QuestionAnswerEnteredEvent.publish(question);
  };

  NextQuestionAnswerLoadedEvent.subscribe((e) => {
    setAnswer(null);
    setInput('');
  });

  useEffect(() => {
    inputRef.current?.focus();
  }, [input]);

  useHotkey(
    ['Space', 'NumpadEnter', 'Enter'],
    () => {
      if (!!answer) {
        return true;
      }

      giveAnswer();
      return true;
    },
    inputRef.current
  );

  if (!question) {
    return <WaitSpinner />;
  }

  return (
    <>
      <div className='h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700'>
        <div
          className='h-2.5 rounded-full bg-blue-600'
          style={{ width: `${(currentNumber * 100) / totalNumber}%` }}
        ></div>
        <span className='text-sm text-gray-500'>
          {currentNumber}/{totalNumber}
        </span>
      </div>
      <div className='text-center text-3xl font-bold'>
        {question.questionText}
      </div>
      <div className='flex flex-col text-center'>
        <div className='mb-6 text-center'>
          <label
            htmlFor={id}
            className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'
          >
            Antwort
          </label>
          <input
            disabled={!!answer}
            autoFocus
            ref={inputRef}
            type='number'
            placeholder='Dini Antwort hie ingäh...'
            id={id}
            value={input}
            onInput={(e) => setInput(e.target.value)}
            className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-center text-3xl text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          />
        </div>
        <button
          disabled={!!answer}
          onClick={(e) => giveAnswer()}
          className='w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto'
        >
          ISCH RICHTIG?
        </button>
      </div>
      <div style={{ minHeight: '100px' }}>
        {answer && answer.isCorrect && (
          <div className='font-serif text-xl font-semibold text-green-800'>
            Antwort <span className='bg-slate-300'>{answer.answerText}</span>{' '}
            isch voll KORRäKT! :-)
          </div>
        )}
        {answer && !answer.isCorrect && (
          <div className='font-serif text-xl font-semibold text-red-800'>
            Antwort <span className='bg-slate-300'>{answer.answerText}</span>{' '}
            isch völlig FAALSCH, WRONG, komplett NöD RICHTIG! :-X
          </div>
        )}
      </div>
    </>
  );
};

export default QuestionAnswerPanel;
