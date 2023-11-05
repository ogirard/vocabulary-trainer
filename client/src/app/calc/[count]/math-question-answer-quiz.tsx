'use client';

import { QuestionAnswer } from '@/components/question-answer/question-answer-model';
import QuestionAnswerQuiz from '@/components/question-answer/question-answer-quiz';

interface MathQuestionAnswerQuizProps {
  questions: QuestionAnswer[];
}

const MathQuestionAnswerQuiz = ({ questions }: MathQuestionAnswerQuizProps) => {
  const evaluateAnswer = (answer: string, current: QuestionAnswer) => {
    return answer === current.correctAnswer;
  };
  
  return (    
    <QuestionAnswerQuiz questions={questions} evaluateAnswer={evaluateAnswer} />
  );
};

export default MathQuestionAnswerQuiz;
