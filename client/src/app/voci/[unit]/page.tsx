import MultipleChoiceQuiz from '@/components/multiple-choice/multiple-choice-quiz';
import { UnitData } from './model';
import { MultipleChoiceQuestion } from '@/components/multiple-choice/multiple-choice-model';
import { shuffle } from 'lodash';
import Link from 'next/link';

async function getData(unitId: number): Promise<UnitData> {
  const apiUrl = process.env.VOCI_API_URL ?? 'http://localhost:5112';
  const res = await fetch(`${apiUrl}/TranslationUnit/${unitId}`);

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
  for (const translation of unitData.translations) {
    const wrongAnswers = shuffle(
      unitData.translations.filter((x) => x !== translation).slice()
    ).slice(0, 3);
    const answers = [
      {
        answerId: `${translation.id}-1`,
        answerText: translation.english,
        isCorrect: true,
      },
      ...wrongAnswers.map((x, i) => ({
        answerId: `${translation.id}-${i + 2}`,
        answerText: x.english,
        isCorrect: false,
      })),
    ];

    multipleChoiceQuestions.push({
      questionId: translation.id,
      questionText: translation.german,
      answers: shuffle(answers),
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
    <>
      <Link
        className='absolute left-5 top-5 text-blue-600 dark:text-blue-200'
        href='/'
      >
        ❮ Zrügg zur Startsiitä
      </Link>
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <h1 className='text-center font-serif text-6xl font-bold text-blue-700'>
          VOCI {unitData.name}
        </h1>

        <MultipleChoiceQuiz multipleChoiceQuestions={multipleChoiceQuestions} />

        <div className='font-serif text-gray-400'>
          {unitData.translations.length} Übersetzigä gladäää ...
        </div>
      </main>
    </>
  );
}
