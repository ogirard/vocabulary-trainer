"use client";

import { useState } from "react";
import {
  MultipleChoiceAnswerClickedEvent,
  NextMultipleChoiceQuestionLoadedEvent,
  MultipleChoiceQuestion,
} from "./multiple-choice-model";
import MultipleChoiceAnswerButton from "./multiple-choice-answer-button";

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

  if(!question?.answers) {
    return <div>NULLLLLLL</div>
  }

  return (
    <>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${(currentNumber * 100) / totalNumber}%` }}
        ></div>
        <span className="text-sm text-gray-500">
          {currentNumber}/{totalNumber}
        </span>
      </div>
      <div className="font-bold text-3xl text-center">
        {question.questionText}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        {question.answers.map((x) => (
          <MultipleChoiceAnswerButton
            key={`${currentNumber}-${x.answerId}`}
            answer={x}
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

export default MultipleChoiceQuestionPanel;
