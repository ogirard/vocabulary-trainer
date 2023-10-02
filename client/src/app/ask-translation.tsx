"use client";

import { useState } from "react";
import AnswerButton, {
  AnswerButtonProps,
  AnswerClickedEvent,
} from "./answer-button";
import { NextTranslationLoadedEvent } from "./random-translation-quiz";

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

  document.addEventListener("onNextTranslationLoaded", (event: Event) => {
    const nextTranslationLoadedEvent = event as NextTranslationLoadedEvent;
    setAnswer(null);
  });

  return (
    <>
      <div className="font-bold text-3xl text-center">
        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          {currentNumber}/{totalNumber}
        </span>
        <br />
        <br />
        {germanText}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {answers.map((x) => (
          <AnswerButton
            key={x.answerId}
            answerId={x.answerId}
            answerText={x.answerText}
            isCorrect={x.isCorrect}
            isAnswered={!!answer}
          />
        ))}
      </div>
      {answer && answer.isCorrect && (
        <div className="text-green-800 font-semibold text-xl font-serif">
          Antwort <span className="bg-slate-300">{answer.answerText}</span> isch
          voll KORRäKT! :-)
        </div>
      )}
      {answer && !answer.isCorrect && (
        <div className="text-red-800 font-semibold text-xl font-serif">
          Antwort <span className="bg-slate-300">{answer.answerText}</span> isch
          völlig FAALSCH, WRONG, komplett NöD RICHTIG! :-X
        </div>
      )}
    </>
  );
};

export default AskTranslation;
