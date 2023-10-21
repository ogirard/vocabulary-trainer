"use client";

import { MouseEvent, useRef } from "react";
import {
  MultipleChoiceAnswer,
  MultipleChoiceAnswerClickedEvent,
} from "./multiple-choice-model";
import { useHotkey } from "@/hooks/useHotkey";

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
    event.currentTarget.classList.toggle("bg-blue-400");
    event.currentTarget.classList.toggle(
      answer.isCorrect ? "bg-green-400" : "bg-red-400"
    );

    MultipleChoiceAnswerClickedEvent.publish(answer);
  };

  useHotkey([`Digit${answerNumber}`, `Numpad${answerNumber}`], () =>
    buttonRef.current?.click()
  );

  return (
    <div className="relative">
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-blue-100 transform translate-x-1/4 -translate-y-1/4 bg-blue-800 rounded-full">
        {answerNumber}
      </span>
      <button
        ref={buttonRef}
        disabled={isAnswered}
        className="bg-blue-400 p-10 rounded-xl text-xl font-bold w-full h-full whitespace-break-spaces"
        onClick={handleClick}
      >
        {answer.answerText}
      </button>
    </div>
  );
};

export default MultipleChoiceAnswerButton;
