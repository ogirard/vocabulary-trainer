import Image from "next/image";

export default function VociPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <br />
        <br />
        <br />
        <div>
          <Image
            className="mr-6"
            src="/ghost.png"
            alt="Nothing Here"
            width={256}
            height={236}
            title="Faaaaaaaalsch!"
            priority
          ></Image>
        </div>
        <br />
        <br />
        <br />
        <div className="text-5xl font-serif text-blue-800 pt-5">
          DU BISCH HIE FALSCH!
        </div>
      </div>
    </main>
  );
}
