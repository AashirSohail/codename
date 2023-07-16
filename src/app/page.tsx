"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  isHost,
  myPlayer,
  usePlayersState,
  usePlayersList,
  useMultiplayerState,
  getState,
  setState,
  insertCoin,
  onPlayerJoin,
} from "playroomkit";
import { generateUniqueNumbers, assignTeams } from "@/helper";
import words from "./words.json";

import StatsBar from "@/components/StatsBar";
import StatusBar from "@/components/StatusBar";
import WordGrid from "@/components/WordGrid";
import InputBar from "@/components/InputBar";
import PillButton from "@/components/PillButton";

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Home() {
  const players = usePlayersList(true);
  const [intervalId, setIntervalId] = useState<any>(null);
  //   const [playerDrawing, setPlayerDrawing] = useMultiplayerState(
  //     'playerDrawing',
  //     players[0]?.id,
  //   )
  const playersThatHaveGuessed = usePlayersState("guessed");

  //   const [randomWords, setRandomWords] = useMultiplayerState('randomWords')
  const [timer, setTimer] = useMultiplayerState("timer", 0);
  const [guesses, setGuesses] = useMultiplayerState("guesses", []);
  const randomWords = getState("randomWords");
  const cardCount = getState("cartCount");

  const haveIGuessed = playersThatHaveGuessed.find(
    (p: { player: { id: any }; state: any }) =>
      p.player.id === myPlayer()?.id && p?.state
  );

  const redTeamPlayers = ([] = players.filter(
    (player: any) => player.state?.team === "red"
  ));
  const blueTeamPlayers = ([] = players.filter(
    (player: any) => player.state?.team === "blue"
  ));

  useEffect(() => {
    const unAssignedPlayers = players.filter(
      (player: any) => !player?.state?.team
    );
    unAssignedPlayers.forEach((player: any) => assignPlayerTeam(player));
    console.log(
      "players",
      players.map((player: any) => player?.state)
    );
  }, [players]);

  //   function isCorrectGuess(guess: string) {
  //     return guess.toLowerCase() === currentWord.toLowerCase()
  //   }

  //   function getNextPlayer() {
  //     for (let i = 0; i < players.length; i++) {
  //       if (players[i].id === playerDrawing) {
  //         return players[(i + 1) % players.length]
  //       }
  //     }
  //   }

  //   function copyImage() {
  //     const data = drawingAreaRef.current?.getImg()
  //     if (!data) return
  //     setPicture(data, true)
  //   }
  // Host will see who has guessed correctly and will be able to move on to the next round
  //   useEffect(() => {
  //     if (isHost()) {
  //       const correctGuesses = guesses.filter((guess: { guess: any }) =>
  //         isCorrectGuess(guess.guess),
  //       )
  //       correctGuesses.forEach((guess: { playerId: any }) => {
  //         const player = players.find((p: { id: any }) => p.id === guess.playerId)
  //         player.setState('guessed', true)
  //       })
  //       if (correctGuesses.length === players.length - 1) {
  //         // Everyone has guessed correctly, change the turn to next player
  //         let nextPlayer = getNextPlayer()
  //         sleep(4000).then(() => {
  //           setPlayerDrawing(nextPlayer.id, true)
  //         })
  //       }
  //     }
  //   }, [guesses, currentWord])

  // When the timer runs out
  //   useEffect(() => {
  //     if (isHost() && timer <= 0) {
  //       let nextPlayer = getNextPlayer()
  //       setPlayerDrawing(nextPlayer?.id, true)
  //     }
  //   }, [timer])

  // When the host changes the turn
  useEffect(() => {
    if (isHost()) {
      // Award points to players that have guessed correctly, reset the guessed state
      players.forEach(
        (player: {
          getState: (arg0: string) => any;
          setState: (arg0: string, arg1: boolean) => void;
        }) => {
          if (player.getState("guessed")) {
            player.setState("score", (player.getState("score") || 0) + 1);
          }
          player.setState("guessed", false);
        }
      );
    }

    // Clear the canvas if the player is drawing
    if (true) {
      setTimer(60);
      //   copyImage()
      try {
        // drawingAreaRef.current.reset()
      } catch (e) {}
      const intervalId = setInterval(() => {
        // copyImage()
        setTimer(getState("timer") - 1, true);
      }, 1000);
      setIntervalId(intervalId);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  }, []);

  const getRandomWords = () => {
    const randomIndexes: number[] = generateUniqueNumbers(1, 300, 25);

    const randomWordsToSave = randomIndexes.map((index: number) => {
      return {
        word: words[index],
        team: "neutral",
        isRevealed: false,
      };
    });
    const { shuffledArray, count } = assignTeams(randomWordsToSave);
    setState("randomWords", shuffledArray);
    setState("cardCount", count);
    return shuffledArray;
  };

  useEffect(() => {
    const initGame = async () => {
      await insertCoin();

      // Pick a random word and init all states
      getRandomWords();
      //   setTimer(60, true)
      setGuesses([], true);
    };
    initGame();
  }, []);

  //   if (!currentWord) return <div>Loading...</div>

  const assignPlayerTeam = (player: any) => {
    if (!!!player || !!player?.state?.team) return;
    if (redTeamPlayers.length < blueTeamPlayers.length) {
      player.setState("team", "red");
      console.log(`${player?.state?.profile?.name} joined the red team`);
    } else {
      player.setState("team", "blue");
      console.log(`${player?.state?.profile?.name} joined the blue team`);
      player.setState("role", "operative");
    }
  };

  //   Handle players joining the game
  //   onPlayerJoin((player: any) => {
  //     try {
  //       assignPlayerTeam(player)
  //     } catch (error) {
  //       console.log('explicit catch', error)
  //     }
  //   })

  const revealCard = (clickedWord: any) => {
    const index = randomWords.findIndex((word: any) => {
      return word.word === clickedWord?.word;
    });
    if (!clickedWord.isRevealed) {
      const count = getState("cardCount");
      const newArray = randomWords.slice();
      newArray[index].isRevealed = true;
      setState("randomWords", newArray, true);

      if (clickedWord.team === "red") {
        const newCount = { ...count };
        newCount[clickedWord.team] = count[clickedWord.team] - 1;
        setState("cartCount", newCount);
        return;
      }
      if (clickedWord.team === "blue") {
        const newCount = { ...count };
        newCount[clickedWord.team] = count[clickedWord.team] - 1;
        setState("cartCount", newCount);
        return;
      }
      if (clickedWord.team === "black") {
        const newCount = { ...count };
        newCount[clickedWord.team] = count[clickedWord.team] - 1;
        setState("cartCount", newCount);
        return;
      }
      if (clickedWord.team === "neutral") {
        const newCount = { ...count };
        newCount[clickedWord.team] = count[clickedWord.team] - 1;
        setState("cartCount", newCount);
        return;
      }
    }
  };

  //   useEffect(() => console.log('count', cardCount), [cardCount])

  return (
    <main className="flex min-h-screen flex-col items-center py-8 justify-between bg-gradient-to-b from-[#8d6bed] to-purple-600 relative">
      <div>
        <StatsBar />
        <div className="flex flex-col items-center gap-5">
          <StatusBar message="Red is guessing" />
          <div className="flex justify-between items-start gap-10">
            <div className="h-52 w-64 rounded-lg shadow-3xl bg-gradient-to-b from-darkRed to-lightRed border-2 border-white p-2">
              <div className="flex justify-between p-2 relative h-full border-2 border-black shadow-xl rounded-lg">
                <Image
                  src="/images/agent.png"
                  height={70}
                  width={70}
                  alt="agent-icon"
                  className="absolute right-1 bottom-0"
                />
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col">
                    <span>Operative(s)</span>
                    <span className="text-xs">names of operatives</span>
                    <PillButton text="Join as Operative(s)" />
                  </div>
                  <div className="flex flex-col">
                    <span>Spymaster(s)</span>
                    <span className="text-xs">names of spymasters</span>
                    <PillButton text="Join as Spymaster(s)" />
                  </div>
                </div>
                <span className="text-5xl font-semibold p-2">
                  {cardCount?.red}
                </span>
              </div>
            </div>
            <WordGrid
              words={randomWords}
              player={myPlayer()}
              handleCardClick={revealCard}
            />
            <div className="h-52 w-64 rounded-lg shadow-3xl bg-gradient-to-b from-darkBlue to-lightBlue border-2 border-white p-2">
              <div className="flex justify-between p-2 relative h-full border-2 border-black shadow-xl rounded-lg">
                <Image
                  src="/images/agent.png"
                  height={70}
                  width={70}
                  alt="agent-icon"
                  className="absolute right-1 bottom-0"
                />
                <div className="flex flex-col justify-between">
                  <div className="flex flex-col">
                    <span>Operative(s)</span>
                    <span className="text-xs">names of operatives</span>
                    <PillButton text="Join as Operative(s)" />
                  </div>
                  <div className="flex flex-col">
                    <span>Spymaster(s)</span>
                    <span className="text-xs">names of spymasters</span>
                    <PillButton text="Join as Spymaster(s)" />
                  </div>
                </div>
                <span className="text-5xl font-semibold p-2">
                  {cardCount?.blue}
                </span>
              </div>
            </div>
          </div>
          <InputBar />
        </div>
      </div>
    </main>
  );
}
