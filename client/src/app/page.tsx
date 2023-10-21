import { shuffle } from "lodash";
import RandomTranslationQuiz from "./random-translation-quiz";
import StartGameButton from "@/components/start-game-button/start-game-button";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-center text-blue-700 font-serif">
        YANIS&apos;
        <br />
        VOCI UND MATHI
        <br />
        TRAINER
      </h1>
      <div className="grid grid-cols-2 grid-rows-2 gap-4">
        <StartGameButton gameName="English Unit 1" gameRoute="voci/1" />
        <StartGameButton gameName="English Unit 2" gameRoute="voci/2" />
        <StartGameButton gameName="English Unit 3" gameRoute="voci/3" />
        <StartGameButton gameName="English Unit 4" gameRoute="voci/4" />
        <StartGameButton gameName="English Unit 5" gameRoute="voci/5" />
      </div>
      <div className="text-sm text-gray-400 text-center">
        <div className="text-lg text-blue-900 inline-block uppercase font-serif">
          ¡bidde-z&apos;rück-bl&auml;bn!
        </div>
        <span className="align-super">&reg;&trade;</span>
        <br />
        &copy; 2023
      </div>
    </main>
  );
}
