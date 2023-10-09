import { shuffle } from "lodash";
import MathRandomMultiplicationQuiz, {
  MathMultiplyQuestion,
} from "./math-random-multiplication-quiz";

export default async function Multiply() {
  const multiplyQuestions: MathMultiplyQuestion[] = [];

  const multiplySeries = [3, 6];
  for (let i = 1; i <= 12; i++) {
    for (const j of multiplySeries) {
      multiplyQuestions.push({
        id: multiplyQuestions.length,
        factor1: i,
        factor2: j,
        answer: i * j,
      });
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center text-blue-950">
        MULTIPLIKATION
      </h1>
      <h3 className="text-3xl text-slate-600">KLEINES 1 x 1</h3>
      <MathRandomMultiplicationQuiz
        multiplyQuestions={shuffle(multiplyQuestions.concat(multiplyQuestions))}
      ></MathRandomMultiplicationQuiz>
      <div className="text-sm text-gray-400">
        {multiplyQuestions.length * 2} Multiplikationä si glade :-)
      </div>
    </main>
  );
}
