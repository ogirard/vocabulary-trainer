import Image from 'next/image';
import StartGameButton from '@/components/start-game-button';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Image
        src='/trainer-yanis-icon.png'
        alt="YANIS' VOCI UND MATHI TRAINER"
        title="YANIS' VOCI UND MATHI TRAINER"
        width={225}
        height={225}
        className='-z-10 opacity-40'
      ></Image>
      <h1 className='-mb-16 -mt-64 text-center font-serif text-6xl font-bold text-blue-700'>
        YANIS&apos;
        <br />
        VOCI UND MATHI
        <br />
        TRAINER
      </h1>
      <div className='grid grid-cols-2 grid-rows-2 gap-4'>
        <StartGameButton gameName='English Unit 1' gameRoute='voci/1' />
        <StartGameButton gameName='English Unit 2' gameRoute='voci/2' />
        <StartGameButton gameName='English Unit 3' gameRoute='voci/3' />
        <StartGameButton gameName='English Unit 4' gameRoute='voci/4' />
        <StartGameButton gameName='English Unit 5' gameRoute='voci/5' />
        <StartGameButton gameName='1 x 1 (100)' gameRoute='math/100' />
        <StartGameButton gameName='1 x 1 (ganz vieli)' gameRoute='math/9999' />
        <StartGameButton gameName='1 x 1 mit igäh (100)' gameRoute='calc/100' />
        <StartGameButton gameName='1 x 1 mit igäh (50/1-12)' gameRoute='calc/50?from=1&to=12' />
      </div>
      <div className='text-center text-sm text-gray-400'>
        <div className='inline-block font-serif text-lg uppercase text-blue-900'>
          ¡bidde-z&apos;rück-bl&auml;bn!
        </div>
        <span className='align-super'>&reg;&trade;</span>
        <br />
        &copy; 2023
      </div>
    </main>
  );
}
