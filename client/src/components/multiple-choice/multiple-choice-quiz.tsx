"use client";

import MultipleChoiceQuestionPanel from "./multiple-choice-question-panel";
import MultipleChoiceResults from "./multiple-choice-results";
import { useEffect, useState } from "react";

import {
  MultipleChoiceAnswerClickedEvent,
  MultipleChoiceQuestion,
  NextMultipleChoiceQuestionLoadedEvent,
} from "./multiple-choice-model";

export interface MathMultiplyQuestion {
  id: number;
  factor1: number;
  factor2: number;
  answer: number;
}

interface MultipleChoiceQuizProps {
  multipleChoiceQuestions: MultipleChoiceQuestion[];
}

const MultipleChoiceQuiz = ({
  multipleChoiceQuestions: multipleChoiceQuestions,
}: MultipleChoiceQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isFinished, setIsFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(
    {} as MultipleChoiceQuestion
  );

  const [answerStats, setAnswerStats] = useState({
    correctCount: 0,
    wrongCount: 0,
  } as { correctCount: number; wrongCount: number });

  const loadNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);

    if (currentIndex >= multipleChoiceQuestions.length) {
      setIsFinished(true);
      return;
    }
    setCurrentQuestion(multipleChoiceQuestions[currentIndex]);
    NextMultipleChoiceQuestionLoadedEvent.publish(currentQuestion);
  };

  useEffect(() => {
    loadNextQuestion();
  }, []);

  MultipleChoiceAnswerClickedEvent.subscribe((e) => {
    const stats = { ...answerStats };
    if (e.answer.isCorrect) {
      stats.correctCount = (stats.correctCount || 0) + 1;
    } else {
      stats.wrongCount = (stats.wrongCount || 0) + 1;
    }

    setAnswerStats(stats);
  });

  return (
    <>
      {!isFinished && (
        <>
          <MultipleChoiceQuestionPanel
            question={currentQuestion}
            currentNumber={currentIndex}
            totalNumber={multipleChoiceQuestions.length}
          ></MultipleChoiceQuestionPanel>

          <button
            className="bg-blue-200 p-8 px-16 min-w-full rounded-lg font-bold text-blue-900"
            onClick={() => loadNextQuestion()}
          >
            NäCHSCHTS FRöGLI!
          </button>
        </>
      )}
      {isFinished && (
        <MultipleChoiceResults
          wrongAnswerCount={answerStats.wrongCount}
          correctAnswerCount={answerStats.correctCount}
          noAnswerCount={
            multipleChoiceQuestions.length -
            (answerStats?.correctCount ?? 0) -
            (answerStats?.wrongCount ?? 0)
          }
        ></MultipleChoiceResults>
      )}
    </>
  );
};

export default MultipleChoiceQuiz;
