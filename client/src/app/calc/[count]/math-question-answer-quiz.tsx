'use client';

import {
  QuestionAnswer,
  QuestionAnswerFinishedEvent,
} from '@/components/question-answer/question-answer-model';
import QuestionAnswerQuiz from '@/components/question-answer/question-answer-quiz';
import Timer from '@/components/timer';
import { useState } from 'react';

interface MathQuestionAnswerQuizProps {
  questions: QuestionAnswer[];
}

const MathQuestionAnswerQuiz = ({ questions }: MathQuestionAnswerQuizProps) => {
  const evaluateAnswer = (answer: string, current: QuestionAnswer) => {
    return answer === current.correctAnswer;
  };

  const [isStopped, setIsStopped] = useState(false);

  QuestionAnswerFinishedEvent.subscribe(() => setIsStopped(true));

  return (
    <>
      <Timer isStopped={isStopped} />
      <br />
      <QuestionAnswerQuiz
        questions={questions}
        evaluateAnswer={evaluateAnswer}
      />
    </>
  );
};

export default MathQuestionAnswerQuiz;
