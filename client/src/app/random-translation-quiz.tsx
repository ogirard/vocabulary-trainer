"use client";

import { shuffle } from "lodash";
import AskTranslation from "./ask-translation";
import { AnswerButtonProps, AnswerClickedEvent } from "./answer-button";
import { useEffect, useState } from "react";
import ResultsOverview from "./results-overview";

export interface Translation {
  id: number;
  german: string;
  english: string;
}

interface RandomTranslationQuizProps {
  translations: Translation[];
}

export interface NextQuestionLoadedEvent extends CustomEvent {
  detail: {
    question: Question;
  };
}

export interface Question {
  question: string;
  answers: AnswerButtonProps[];
}

const RandomTranslationQuiz = ({
  translations,
}: RandomTranslationQuizProps) => {
  const [currentTranslation, setCurrentTranslation] = useState(-1);
  const [currentQuestion, setCurrentQuestion] = useState({} as Question);

  const moveToNextTranslation = () => {
    setCurrentTranslation(currentTranslation + 1);
    if (currentTranslation >= translations.length) {
      return;
    }

    const translationsCopy = translations.slice();
    const current = translationsCopy.splice(currentTranslation, 1)[0];
    const randomTranslations = shuffle(translationsCopy).slice(0, 3);

    const answers: AnswerButtonProps[] = [
      {
        isCorrect: true,
        answerId: current.id,
        answerText: current.english,
      },
      ...randomTranslations.map(
        (x) =>
          ({
            isCorrect: false,
            answerId: x.id,
            answerText: x.english,
          } as AnswerButtonProps)
      ),
    ];

    setCurrentQuestion({ question: current.german, answers: shuffle(answers) });
    const nextQuestionLoadedEvent = new CustomEvent("onNextQuestionLoaded", {
      detail: { question: currentQuestion },
    } as NextQuestionLoadedEvent);
    document.dispatchEvent(nextQuestionLoadedEvent);
  };

  const [answerStats, setAnswerStats] = useState({
    correctCount: 0,
    wrongCount: 0,
  } as { correctCount: number; wrongCount: number });

  useEffect(() => {
   
    moveToNextTranslation();
  }, []);

  document?.addEventListener("onAnswerClicked", (event: Event) => {
    const answerClickedEvent = event as AnswerClickedEvent;
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
      {currentTranslation < translations.length && currentQuestion.answers && (
        <>
          <AskTranslation
            answers={currentQuestion.answers}
            currentNumber={currentTranslation}
            totalNumber={translations.length}
            germanText={currentQuestion.question}
          ></AskTranslation>

          <button
            className="bg-blue-200 p-8 px-16 min-w-full rounded-lg font-bold text-blue-900"
            onClick={() => moveToNextTranslation()}
          >
            NäCHSCHTI FROG!
          </button>
        </>
      )}
      {currentTranslation >= translations.length && (
        <ResultsOverview
          wrongAnswerCount={answerStats.wrongCount}
          correctAnswerCount={answerStats.correctCount}
          noAnswerCount={
            translations.length -
            (answerStats?.correctCount ?? 0) -
            (answerStats?.wrongCount ?? 0)
          }
        ></ResultsOverview>
      )}
    </>
  );
};

export default RandomTranslationQuiz;
