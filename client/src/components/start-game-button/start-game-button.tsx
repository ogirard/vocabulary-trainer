"use client";

import { useRouter } from "next/navigation";

export interface StartGameButtonProps {
  gameName: string;
  gameRoute: string;
}

const StartGameButton = ({ gameName, gameRoute }: StartGameButtonProps) => {
  const router = useRouter();

  return (
    <button
      className="bg-yellow-600 p-10 rounded-full text-2xl font-bold text-white"
      style={{ minWidth: "250px" }}
      onClick={() => router.push("/" + gameRoute)}
    >
      {gameName}
    </button>
  );
};

export default StartGameButton;
