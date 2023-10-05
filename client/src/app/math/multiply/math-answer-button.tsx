"use client";

import { MouseEvent } from "react";

export interface MathAnswerButtonProps {
  answerId: number;
  answerText: string;
  isCorrect: boolean;
  isAnswered?: boolean;
}

export interface MathAnswerClickedEvent extends CustomEvent {
  detail: {
    answerId: number;
    answerText: string;
    isCorrect: boolean;
  };
}

const AnswerButton = (props: MathAnswerButtonProps) => {
  const handleClick = (event: MouseEvent) => {
    event.currentTarget.classList.toggle("bg-blue-400");
    event.currentTarget.classList.toggle(
      props.isCorrect ? "bg-green-400" : "bg-red-400"
    );
    console.log(props);

    const answerClickedEvent = new CustomEvent("onMathAnswerClicked", {
      detail: {
        answerId: props.answerId,
        answerText: props.answerText,
        isCorrect: props.isCorrect,
      },
    } as MathAnswerClickedEvent);

    document.dispatchEvent(answerClickedEvent);
  };

  return (
    <button
      disabled={props.isAnswered}
      className="bg-blue-400 p-10 rounded-xl text-xl font-bold"
      style={{ minWidth: "250px" }}
      onClick={handleClick}
    >
      {props.answerText}
    </button>
  );
};

export default AnswerButton;
