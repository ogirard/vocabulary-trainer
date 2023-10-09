"use client";

import { MouseEvent } from 'react';
import {
  MultipleChoiceAnswer,
  MultipleChoiceAnswerClickedEvent,
} from "./multiple-choice-model";

interface MultipleChoiceAnswerButtonProps {
  answer: MultipleChoiceAnswer;
  isAnswered: boolean;
}

const MultipleChoiceAnswerButton = ({
  answer,
  isAnswered,
}: MultipleChoiceAnswerButtonProps) => {
  const handleClick = (event: MouseEvent) => {
    event.currentTarget.classList.toggle("bg-blue-400");
    event.currentTarget.classList.toggle(
      answer.isCorrect ? "bg-green-400" : "bg-red-400"
    );

    MultipleChoiceAnswerClickedEvent.publish(answer);
  };

  return (
    <button
      disabled={isAnswered}
      className="bg-blue-400 p-10 rounded-xl text-xl font-bold"
      style={{ minWidth: "250px" }}
      onClick={handleClick}
    >
      {answer.answerText}
    </button>
  );
};

export default MultipleChoiceAnswerButton;
