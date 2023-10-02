import { shuffle } from "lodash";
import RandomTranslationQuiz from "./random-translation-quiz";

async function getData() {
  const res = await fetch("http://localhost:5112/TranslationUnit/1");

  if (!res.ok) {
    throw new Error("Could not fetch translation unit!");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center text-blue-950">
        YANIS&apos; VOCI TRAINER
      </h1>
      <h3 className="text-3xl text-slate-600">UNIT 1</h3>
      <RandomTranslationQuiz
        translations={shuffle(data.translations)}
      ></RandomTranslationQuiz>
      <div className="text-sm text-gray-400">
        {data.name} loaded with {data.translations.length} translations...
      </div>
    </main>
  );
}
