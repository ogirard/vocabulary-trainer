'use client';

import { MouseEvent, useRef } from 'react';
import {
  MultipleChoiceAnswer,
  MultipleChoiceAnswerClickedEvent,
} from './multiple-choice-model';
import { useHotkey } from '@/hooks/useHotkey';

interface MultipleChoiceAnswerButtonProps {
  answer: MultipleChoiceAnswer;
  isAnswered: boolean;
  answerNumber: number;
}

const MultipleChoiceAnswerButton = ({
  answer,
  isAnswered,
  answerNumber,
}: MultipleChoiceAnswerButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleClick = (event: MouseEvent) => {
    event.currentTarget.classList.toggle('bg-blue-400');
    event.currentTarget.classList.toggle(
      answer.isCorrect ? 'bg-green-400' : 'bg-red-400'
    );

    MultipleChoiceAnswerClickedEvent.publish(answer);
  };

  useHotkey(
    [`Digit${answerNumber}`, `Numpad${answerNumber}`],
    () => buttonRef.current?.click()
  );

  return (
    <div className='relative'>
      <span className='absolute right-0 top-0 inline-flex -translate-y-1/4 translate-x-1/4 transform items-center justify-center rounded-full bg-blue-800 px-2 py-1 text-xs font-bold leading-none text-blue-100'>
        {answerNumber}
      </span>
      <button
        ref={buttonRef}
        disabled={isAnswered}
        className='h-full w-full whitespace-break-spaces rounded-xl bg-blue-400 p-10 text-xl font-bold'
        onClick={handleClick}
      >
        {answer.answerText}
      </button>
    </div>
  );
};

export default MultipleChoiceAnswerButton;
