import AnswerButton from "./answer-button";

async function getData() {
  const res = await fetch("http://localhost:5112/TranslationUnit/1");

  if (!res.ok) {
    throw new Error("Could not fetch translation unit!");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  let currentTranslation = 0;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center">VOCI TRAINER</h1>
      <div className="font-bold text-3xl text-center">
        {data.translations[currentTranslation].german}
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <AnswerButton
          answerId={1}
          answerText={data.translations[currentTranslation].english}
        />
        <AnswerButton answerId={2} answerText="Answer 2" />
        <AnswerButton answerId={3} answerText="Answer 3" />
        <AnswerButton answerId={4} answerText="Answer 4" />
      </div>
      <div>
        {data.name} loaded with {data.translations.length} translations...
      </div>
    </main>
  );
}
