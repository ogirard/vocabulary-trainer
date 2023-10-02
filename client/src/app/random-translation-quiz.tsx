"use client";

import { shuffle } from "lodash";
import AskTranslation from "./ask-translation";
import { AnswerButtonProps, AnswerClickedEvent } from "./answer-button";
import { useState } from "react";
import Image from "next/image";

export interface Translation {
  id: number;
  german: string;
  english: string;
}

interface RandomTranslationQuizProps {
  translations: Translation[];
}

export interface NextTranslationLoadedEvent extends CustomEvent {
  detail: {
    translation: Translation;
  };
}

const RandomTranslationQuiz = (props: RandomTranslationQuizProps) => {
  const [currentTranslation, setCurrentTranslation] = useState(0);
  const [answerStats, setAnswerStats] = useState(
    {} as { correctCount: number; wrongCount: number }
  );

  const translations = props.translations.slice();
  const current = translations.splice(currentTranslation, 1)[0];
  const randomTranslations = shuffle(translations).slice(0, 3);

  document.addEventListener("onAnswerClicked", (event: Event) => {
    const answerClickedEvent = event as AnswerClickedEvent;
    const stats = { ...answerStats };
    if (answerClickedEvent.detail.isCorrect) {
      stats.correctCount = (stats.correctCount || 0) + 1;
    } else {
      stats.wrongCount = (stats.wrongCount || 0) + 1;
    }
    setAnswerStats(stats);
  });

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

  return (
    <>
      <AskTranslation
        answers={shuffle(answers)}
        currentNumber={currentTranslation + 1}
        totalNumber={props.translations.length}
        germanText={current.german}
      ></AskTranslation>
      <br />
      <div className="flex-wrap inline-flex">
        <div>
          <Image
            className="mr-6"
            src="/correct.svg"
            alt="Correct Answers"
            width={40}
            height={25}
            priority
          ></Image>
          <div className="text-green-800 font-semibold text-xl font-serif text-center">
            {answerStats.correctCount}
          </div>
        </div>

        <div>
          <Image
            src="/wrong.svg"
            alt="Wrong Answers"
            width={40}
            height={25}
            priority
          ></Image>
          <div className="text-red-800 font-semibold text-xl font-serif text-center">
            {answerStats.wrongCount}
          </div>
        </div>
      </div>

      {currentTranslation < translations.length && (
        <button
          className="bg-blue-200 p-8"
          onClick={() => {
            if (currentTranslation == translations.length - 1) {
              return;
            }

            setCurrentTranslation(currentTranslation + 1);
            const nextTranslationLoadedEvent = new CustomEvent(
              "onNextTranslationLoaded",
              {
                detail: { translation: translations[currentTranslation + 1] },
              } as NextTranslationLoadedEvent
            );
            document.dispatchEvent(nextTranslationLoadedEvent);
          }}
        >
          NEXT
        </button>
      )}
    </>
  );
};

export default RandomTranslationQuiz;
