"use client";

import { MouseEvent } from "react";

export interface AnswerButtonProps {
  answerId: number;
  answerText: string;
  isCorrect: boolean;
  isAnswered?: boolean;
}

export interface AnswerClickedEvent extends CustomEvent {
  detail: {
    answerId: number;
    answerText: string;
    isCorrect: boolean;
  };
}

const AnswerButton = (props: AnswerButtonProps) => {
  const handleClick = (event: MouseEvent) => {
    event.currentTarget.classList.toggle("bg-blue-400");
    event.currentTarget.classList.toggle(
      props.isCorrect ? "bg-green-400" : "bg-red-400"
    );
    console.log(props);

    const answerClickedEvent = new CustomEvent("onAnswerClicked", {
      detail: {
        answerId: props.answerId,
        answerText: props.answerText,
        isCorrect: props.isCorrect,
      },
    } as AnswerClickedEvent);

    document.dispatchEvent(answerClickedEvent);
  };

  return (
    <button
      disabled={props.isAnswered}
      className="bg-blue-400 p-10 rounded-xl text-xl"
      style={{ minWidth: "250px" }}
      onClick={handleClick}
    >
      {props.answerText}
    </button>
  );
};

export default AnswerButton;
