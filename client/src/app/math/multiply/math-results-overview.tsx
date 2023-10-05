"use client";

import Image from "next/image";

export interface MathResultsOverviewProps {
  wrongAnswerCount: number;
  correctAnswerCount: number;
  noAnswerCount: number;
}

const MathResultsOverview = ({
  wrongAnswerCount,
  correctAnswerCount,
  noAnswerCount,
}: MathResultsOverviewProps) => {
  return (
    <>
      <div className="flex-wrap inline-flex">
        <div>
          <Image
            className="mr-6"
            src="/correct.svg"
            alt="Correct Answers"
            width={80}
            height={25}
            title="Korräkt!"
            priority
          ></Image>
          <br />
          <div className="text-green-800 font-semibold text-3xl font-serif text-center">
            {correctAnswerCount}
          </div>
        </div>

        <div className="ml-12">
          <Image
            className="mr-6"
            src="/wrong.svg"
            alt="Wrong Answers"
            width={80}
            height={25}
            title="Faaaaaaaalsch!"
            priority
          ></Image>
          <br />
          <div className="text-red-800 font-semibold text-3xl font-serif text-center">
            {wrongAnswerCount}
          </div>
        </div>
        <div className="ml-12">
          <Image
            src="/no.svg"
            alt="No Answers"
            width={80}
            height={25}
            priority
            title="Vergässe!"
          ></Image>
          <br />
          <div className="text-blue-800 font-semibold text-3xl font-serif text-center">
            {noAnswerCount}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <button
        className="bg-blue-200 p-8 px-16 min-w-full rounded-lg font-bold text-blue-900 mt-20"
        onClick={() => window.location.reload()}
      >
        NOMOU VO VORE!
      </button>
    </>
  );
};

export default MathResultsOverview;
