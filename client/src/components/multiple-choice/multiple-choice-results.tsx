'use client';

import Image from 'next/image';

export interface MultipleChoiceResultsProps {
  wrongAnswerCount: number;
  correctAnswerCount: number;
  noAnswerCount: number;
}

const MultipleChoiceResults = ({
  wrongAnswerCount,
  correctAnswerCount,
  noAnswerCount,
}: MultipleChoiceResultsProps) => {
  return (
    <>
      <div className='inline-flex flex-wrap'>
        <div>
          <Image
            className='mr-6'
            src='/correct.svg'
            alt='Correct Answers'
            width={80}
            height={25}
            title='Korräkt!'
            priority
          ></Image>
          <br />
          <div className='text-center font-serif text-3xl font-semibold text-green-800'>
            {correctAnswerCount}
          </div>
        </div>

        <div className='ml-12'>
          <Image
            className='mr-6'
            src='/wrong.svg'
            alt='Wrong Answers'
            width={80}
            height={25}
            title='Faaaaaaaalsch!'
            priority
          ></Image>
          <br />
          <div className='text-center font-serif text-3xl font-semibold text-red-800'>
            {wrongAnswerCount}
          </div>
        </div>
        <div className='ml-12'>
          <Image
            src='/no.svg'
            alt='No Answers'
            width={80}
            height={25}
            priority
            title='Vergässe!'
          ></Image>
          <br />
          <div className='text-center font-serif text-3xl font-semibold text-blue-800'>
            {noAnswerCount}
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />

      <button
        className='mt-20 min-w-full rounded-lg bg-blue-200 p-8 px-16 font-bold text-blue-900'
        onClick={() => window.location.reload()}
      >
        NOMOU VO VORE!
      </button>
    </>
  );
};

export default MultipleChoiceResults;
