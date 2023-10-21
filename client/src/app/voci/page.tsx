import Image from "next/image";
import Link from "next/link";

export default function VociPage() {
  return (
    <>
      <Link className="absolute left-5 top-5 dark:text-blue-200 text-blue-600" href="/">
        ❮ Zrügg zur Startsiitä
      </Link>
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
    </>
  );
}
