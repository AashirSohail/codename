import { useEffect } from "react";
import Image from "next/image";

const styles: any = {
  red: "bg-gradient-to-b from-darkRed to-lightRed",
  blue: "bg-gradient-to-b from-darkBlue to-lightBlue",
  black: "bg-gradient-to-b from-darkGray to-lightGray",
  neutral: "bg-gradient-to-b from-darkYellow to-lightYellow",
};

const WordGrid = ({ words, player, handleCardClick }: any) => {
  useEffect(() => {}, [words]);

  return (
    <div className="grid gap-3 grid-cols-5 grid-rows-5">
      {!!words &&
        words.map((word: any) => (
          // Add team based click check
          <div
            style={{
              pointerEvents: `${
                player?.state?.role === "operative" ? "auto" : "none"
              }`,
            }}
            onClick={() => handleCardClick(word)}
            key={word?.word}
            className={`
            uppercase font-bold px-2 py-2 text-center tracking-wide rounded-lg border-2
            ${
              word?.isRevealed
                ? `${styles[word?.team]}`
                : "bg-gradient-to-b from-[#C2B280] to-[#C19A6B]"
            }
            ${
              player?.state?.role === "operative"
                ? "cursor-pointer"
                : "cursor-not-allowed"
            }
            `}
          >
            <div className="flex flex-col px-2 flex items-center justify-center relative h-16 border border-black">
              {word?.word}
              <Image
                src="/images/agent.png"
                height={20}
                width={20}
                alt="agent-icon"
                className="absolute right-0 bottom-0"
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default WordGrid;
