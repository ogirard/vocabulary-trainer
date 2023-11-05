'use client';

import { useEffect, useRef, useState } from 'react';

import {
  QuestionAnswer,
  NextQuestionAnswerLoadedEvent,
  QuestionAnswerEnteredEvent,
} from './question-answer-model';
import { useHotkey } from '@/hooks/useHotkey';
import QuestionAnswerResults from './question-answer-results';
import QuestionAnswerPanel from './question-answer-panel';

interface QuestionAnswerQuizProps {
  questions: QuestionAnswer[];
  evaluateAnswer: (answer: string, current: QuestionAnswer) => boolean;
}

const QuestionAnswerQuiz = ({
  questions,
  evaluateAnswer,
}: QuestionAnswerQuizProps) => {
  const panelRef = useRef<HTMLDivElement>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState({} as QuestionAnswer);

  const [answerStats, setAnswerStats] = useState({
    correctCount: 0,
    wrongCount: 0,
  } as { correctCount: number; wrongCount: number });

  const loadNextQuestion = () => {
    setCurrentIndex(currentIndex + 1);
    if (currentIndex >= questions.length) {
      setIsFinished(true);
      return;
    }
    setCurrentQuestion(questions[currentIndex]);
    NextQuestionAnswerLoadedEvent.publish(currentQuestion);
  };

  useEffect(() => {
    loadNextQuestion();
  }, []);

  QuestionAnswerEnteredEvent.subscribe((e) => {
    const stats = { ...answerStats };
    if (e.answer.isCorrect) {
      stats.correctCount = (stats.correctCount || 0) + 1;
    } else {
      stats.wrongCount = (stats.wrongCount || 0) + 1;
    }

    setAnswerStats(stats);
  });

  useHotkey(['Space', 'NumpadEnter', 'Enter'], () => {
    loadNextQuestion();
    return true;
  });

  return (
    <>
      {!isFinished && (
        <>
          <QuestionAnswerPanel            
            question={currentQuestion}
            currentNumber={currentIndex}
            totalNumber={questions.length}
            evaluateAnswer={evaluateAnswer}
          ></QuestionAnswerPanel>

          <button
            className='min-w-full rounded-lg bg-blue-200 p-8 px-16 font-bold text-blue-900'
            onClick={() => loadNextQuestion()}
          >
            NäCHSCHTS FRöGLI!
          </button>
        </>
      )}
      {isFinished && (
        <QuestionAnswerResults
          wrongAnswerCount={answerStats.wrongCount}
          correctAnswerCount={answerStats.correctCount}
          noAnswerCount={
            questions.length -
            (answerStats?.correctCount ?? 0) -
            (answerStats?.wrongCount ?? 0)
          }
        ></QuestionAnswerResults>
      )}
    </>
  );
};

export default QuestionAnswerQuiz;
