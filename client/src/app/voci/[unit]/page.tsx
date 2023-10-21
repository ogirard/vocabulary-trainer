import MultipleChoiceQuiz from "@/components/multiple-choice/multiple-choice-quiz";
import { UnitData } from "./model";
import { MultipleChoiceQuestion } from "@/components/multiple-choice/multiple-choice-model";
import { shuffle } from "lodash";

async function getData(unitId: number): Promise<UnitData> {
  const res = await fetch("http://localhost:5112/TranslationUnit/" + unitId);

  if (!res.ok) {
    throw new Error(`Could not fetch translation unit with ID ${unitId}!`);
  }

  const unitData = await res.json();
  return unitData as UnitData;
}

function getMultipleChoiceQuestions(
  unitData: UnitData
): MultipleChoiceQuestion[] {
  const multipleChoiceQuestions: MultipleChoiceQuestion[] = [];
  let questionId = 0;
  for (const translation of unitData.translations) {
    const wrongAnswers = shuffle(
      unitData.translations.filter((x) => x !== translation).slice()
    ).slice(0, 3);
    questionId++;
    multipleChoiceQuestions.push({
      questionId: questionId,
      questionText: translation.german,
      answers: shuffle([
        {
          answerId: `${questionId}-1`,
          answerText: translation.english,
          isCorrect: true,
        },
        ...wrongAnswers.map((x, i) => ({
          answerId: `${questionId}-${i + 2}`,
          answerText: x.english,
          isCorrect: false,
        })),
      ]),
    });
  }

  return shuffle(multipleChoiceQuestions);
}

export default async function VociPage({
  params,
}: {
  params: { unit: string };
}) {
  const unitData = await getData(parseInt(params.unit));

  const multipleChoiceQuestions = getMultipleChoiceQuestions(unitData);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center text-blue-700 font-serif">
        VOCI {unitData.name}
      </h1>

      <MultipleChoiceQuiz multipleChoiceQuestions={multipleChoiceQuestions} />

      <div className="font-serif text-gray-400">
        {unitData.translations.length} Übersetzigä gladäää ...
      </div>
    </main>
  );
}
