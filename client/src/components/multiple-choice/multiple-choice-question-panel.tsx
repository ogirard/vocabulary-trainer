'use client';

import { useState } from 'react';
import {
  MultipleChoiceAnswerClickedEvent,
  NextMultipleChoiceQuestionLoadedEvent,
  MultipleChoiceQuestion,
} from './multiple-choice-model';
import MultipleChoiceAnswerButton from './multiple-choice-answer-button';
import WaitSpinner from '../wait-spinner';

interface MultipleChoiceQuestionPanelProps {
  question: MultipleChoiceQuestion;
  currentNumber: number;
  totalNumber: number;
}

const MultipleChoiceQuestionPanel = ({
  question,
  currentNumber,
  totalNumber,
}: MultipleChoiceQuestionPanelProps) => {
  const [answer, setAnswer] = useState<{
    answerText: string;
    isCorrect: boolean;
  } | null>(null);

  MultipleChoiceAnswerClickedEvent.subscribe((e) => setAnswer(e.answer));
  NextMultipleChoiceQuestionLoadedEvent.subscribe((e) => setAnswer(null));

  if (!question?.answers) {
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
      <div className='grid grid-cols-2 grid-rows-2 gap-4'>
        {question.answers.map((x, i) => (
          <MultipleChoiceAnswerButton
            key={`${currentNumber}-${x.answerId}`}
            answer={x}
            answerNumber={i + 1}
            isAnswered={!!answer}
          />
        ))}
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

export default MultipleChoiceQuestionPanel;
