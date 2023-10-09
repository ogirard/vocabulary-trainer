"use client";

import { shuffle } from "lodash";
import MathAskTranslation from "./math-ask-translation";
import { MathAnswerButtonProps, MathAnswerClickedEvent } from "./math-answer-button";
import { useEffect, useState } from "react";
import MathResultsOverview from "./math-results-overview";

export interface MathMultiplyQuestion {
  id: number;
  factor1: number;
  factor2: number;
  answer: number;
}

interface MathRandomMultiplicationQuizProps {
  multiplyQuestions: MathMultiplyQuestion[];
}

export interface NextMathQuestionLoadedEvent extends CustomEvent {
  detail: {
    question: MathMultiplyQuestionWithAnswers;
  };
}

export interface MathMultiplyQuestionWithAnswers {
  question: MathMultiplyQuestion;
  answers: MathAnswerButtonProps[];
}

const MathRandomMultiplicationQuiz = ({
  multiplyQuestions,
}: MathRandomMultiplicationQuizProps) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState({} as MathMultiplyQuestionWithAnswers);

  const moveToNextTranslation = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex >= multiplyQuestions.length) {
      return;
    }

    const multiplyQuestionsCopy = multiplyQuestions.slice();
    const current = multiplyQuestionsCopy.splice(currentIndex, 1)[0];
    const randomQuestions = shuffle(multiplyQuestionsCopy).slice(0, 1);

    randomQuestions.push({ id: Math.floor(Math.random() * 144) + 9900, answer: Math.floor(Math.random() * 144) + 1 } as MathMultiplyQuestion);
    randomQuestions.push({ id: Math.floor(Math.random() * 144) + 9900, answer: Math.floor(Math.random() * 144) + 1 } as MathMultiplyQuestion);

    const answers: MathAnswerButtonProps[] = [
      {
        isCorrect: true,
        answerId: current.id,
        answerText: current.answer.toString(),
      },
      ...randomQuestions.map(
        (x) =>
        ({
          isCorrect: false,
          answerId: x.id,
          answerText: x.answer.toString(),
        } as MathAnswerButtonProps)
      ),
    ];

    setCurrentQuestion({ question: current, answers: shuffle(answers) });
    const nextQuestionLoadedEvent = new CustomEvent("onNextMathQuestionLoaded", {
      detail: { question: currentQuestion },
    } as NextMathQuestionLoadedEvent);
    document.dispatchEvent(nextQuestionLoadedEvent);
  };

  const [answerStats, setAnswerStats] = useState({
    correctCount: 0,
    wrongCount: 0,
  } as { correctCount: number; wrongCount: number });

  useEffect(() => {
    moveToNextTranslation();
  }, []);

  document.addEventListener("onMathAnswerClicked", (event: Event) => {
    const answerClickedEvent = event as MathAnswerClickedEvent;
    const stats = { ...answerStats };
    if (answerClickedEvent.detail.isCorrect) {
      stats.correctCount = (stats.correctCount || 0) + 1;
    } else {
      stats.wrongCount = (stats.wrongCount || 0) + 1;
    }
    setAnswerStats(stats);
  });

  return (
    <>
      {currentIndex < multiplyQuestions.length && currentQuestion.answers && (
        <>
          <MathAskTranslation
            answers={currentQuestion.answers}
            currentNumber={currentIndex}
            totalNumber={multiplyQuestions.length}
            questionText={currentQuestion.question.factor1 + " x " + currentQuestion.question.factor2}
          ></MathAskTranslation>

          <button
            className="bg-blue-200 p-8 px-16 min-w-full rounded-lg font-bold text-blue-900"
            onClick={() => moveToNextTranslation()}
          >
            NäCHSCHTI RäCHNIG!
          </button>
        </>
      )}
      {currentIndex >= multiplyQuestions.length && (
        <MathResultsOverview
          wrongAnswerCount={answerStats.wrongCount}
          correctAnswerCount={answerStats.correctCount}
          noAnswerCount={
            multiplyQuestions.length -
            (answerStats?.correctCount ?? 0) -
            (answerStats?.wrongCount ?? 0)
          }
        ></MathResultsOverview>
      )}
    </>
  );
};

export default MathRandomMultiplicationQuiz;
