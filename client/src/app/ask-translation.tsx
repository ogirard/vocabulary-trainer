"use client";

import { useState } from "react";
import AnswerButton, {
  AnswerButtonProps,
  AnswerClickedEvent,
} from "./answer-button";
import { NextQuestionLoadedEvent } from "./random-translation-quiz";

interface AskTranslationProps {
  germanText: string;
  currentNumber: number;
  totalNumber: number;
  answers: AnswerButtonProps[];
}

const AskTranslation = ({
  germanText,
  currentNumber,
  totalNumber,
  answers,
}: AskTranslationProps) => {
  const [answer, setAnswer] = useState<{
    answerText: string;
    isCorrect: boolean;
  } | null>(null);

  document.addEventListener("onAnswerClicked", (event: Event) => {
    const answerClickedEvent = event as AnswerClickedEvent;
    setAnswer(answerClickedEvent.detail);
  });

  document.addEventListener("onNextQuestionLoaded", (event: Event) => {
    const nextQuestionLoadedEvent = event as NextQuestionLoadedEvent;
    setAnswer(null);
  });

  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${(currentNumber * 100) / totalNumber}%` }}
        ></div>
        <span className="text-sm text-gray-500">
          {currentNumber + 1}/{totalNumber}
        </span>
      </div>
      <div className="font-bold text-3xl text-center">{germanText}</div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {answers.map((x) => (
          <AnswerButton
            key={`${currentNumber}-${x.answerId}`}
            answerId={x.answerId}
            answerText={x.answerText}
            isCorrect={x.isCorrect}
            isAnswered={!!answer}
          />
        ))}
      </div>
      <div style={{ minHeight: "100px" }}>
        {answer && answer.isCorrect && (
          <div className="text-green-800 font-semibold text-xl font-serif">
            Antwort <span className="bg-slate-300">{answer.answerText}</span>{" "}
            isch voll KORRäKT! :-)
          </div>
        )}
        {answer && !answer.isCorrect && (
          <div className="text-red-800 font-semibold text-xl font-serif">
            Antwort <span className="bg-slate-300">{answer.answerText}</span>{" "}
            isch völlig FAALSCH, WRONG, komplett NöD RICHTIG! :-X
          </div>
        )}
      </div>
    </>
  );
};

export default AskTranslation;
