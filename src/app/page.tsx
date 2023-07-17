'use client'

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import Image from 'next/image'
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
  useGameState,
} from 'playroomkit'
import { generateUniqueNumbers, assignTeams } from '@/helper'
import words from './words.json'

import StatsBar from '@/components/StatsBar'
import StatusBar from '@/components/StatusBar'
import WordGrid from '@/components/WordGrid'
import InputBar from '@/components/InputBar'
import TeamArea from '@/components/TeamArea'
import PillButton from '@/components/PillButton'

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function Home() {
  const players = usePlayersList(true)

  //   const [guessIntervalId, setGuessIntervalId] = useState<any>(null)
  //   const [hintIntervalId, setHintIntervalId] = useState<any>(null)
  //   const playersThatHaveGuessed = usePlayersState('guessed')

  const [hintTimer, setHintTimer] = useMultiplayerState('hintTimer', 0)
  const [guessTimer, setGuessTimer] = useMultiplayerState('guessTimer', 0)
  const [isHintTimerRunning, setIsHintTimerRunning] = useMultiplayerState(
    'isHintTimerRunning',
    false,
  )
  const [isGuessTimerRunning, setIsGuessTimerRunning] = useMultiplayerState(
    'isGuessTimerRunning',
    false,
  )

  const [guesses, setGuesses] = useMultiplayerState('guesses', [])

  const randomWords = getState('randomWords')
  const cardCount = getState('cardCount')
  //   const hintTimer = getState('hintTimer')
  //   const guessTimer = getState('guessTimer')
  const teamTurn = getState('teamTurn')

  const redTeamPlayers = ([] = players.filter(
    (player: any) => player.state?.team === 'red',
  ))
  const blueTeamPlayers = ([] = players.filter(
    (player: any) => player.state?.team === 'blue',
  ))

  useEffect(() => {
    const unAssignedPlayers = players.filter(
      (player: any) => !player?.state?.team,
    )
    unAssignedPlayers.forEach((player: any) => assignPlayerTeam(player))
    console.log(
      'players',
      players.map((player: any) => player?.state),
    )
  }, [players])

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

  // When the turn ends

  //   useEffect(() => {
  //     if (isHost()) {
  //       // Award points to players that have guessed correctly, reset the guessed state
  //       players.forEach(
  //         (player: {
  //           getState: (arg0: string) => any
  //           setState: (arg0: string, arg1: boolean) => void
  //         }) => {
  //           if (player.getState('guessed')) {
  //             player.setState('score', (player.getState('score') || 0) + 1)
  //           }
  //           player.setState('guessed', false)
  //         },
  //       )
  //     }

  //     // Clear the canvas if the player is drawing
  //     if (true) {
  //       setTimer(60)
  //       //   copyImage()
  //       try {
  //         // drawingAreaRef.current.reset()
  //       } catch (e) {}
  //       const intervalId = setInterval(() => {
  //         // copyImage()
  //         setTimer(getState('timer') - 1, true)
  //       }, 1000)
  //       setIntervalId(intervalId)
  //     } else {
  //       if (intervalId) {
  //         clearInterval(intervalId)
  //         setIntervalId(null)
  //       }
  //     }
  //   }, [])

  const getRandomWords = () => {
    const randomIndexes: number[] = generateUniqueNumbers(1, 300, 25)

    const randomWordsToSave = randomIndexes.map((index: number) => {
      return {
        word: words[index],
        team: 'neutral',
        isRevealed: false,
      }
    })
    const { shuffledArray, count } = assignTeams(randomWordsToSave)
    setState('randomWords', shuffledArray)
    console.log('setting count', count)
    setState('cardCount', count)
    return shuffledArray
  }

  //   const startHintTimer = () => {
  //     if (getState('hintTimer') == -1) return
  //     const intervalId = setInterval(() => {
  //       console.log('hintTimer', getState('hintTimer'))
  //       if (getState('hintTimer') - 1 >= 0)
  //         setHintTimer(getState('hintTimer') - 1, true)
  //       else stopHintTimer()
  //     }, 1000)
  //     setHintIntervalId(intervalId)
  //   }

  //   const startGuessTimer = () => {
  //     if (getState('guessTimer') == -1) return

  //     const intervalId = setInterval(() => {
  //       console.log('guessTimer', getState('guessTimer'))

  //       if (getState('guessTimer') - 1 >= 0)
  //         setGuessTimer(getState('guessTimer') - 1, true)
  //       else stopGuessTimer()
  //     }, 1000)
  //     stopHintTimer()
  //     setGuessIntervalId(intervalId)
  //   }

  //   const stopHintTimer = () => {
  //     clearInterval(hintIntervalId)
  //     setState('hintTime', 180)
  //   }

  //   const stopGuessTimer = () => {
  //     clearInterval(guessIntervalId)
  //     setState('guessTime', 300)
  //   }

  // Function to start the guess timer when needed
  const startGuessTimer = () => {
    setIsGuessTimerRunning(true)
  }
  // Function to start the hint timer when needed

  const startHintTimer = () => {
    setIsHintTimerRunning(true)
  }

  // Function to start the guess timer when needed
  const stopGuessTimer = () => {
    setIsGuessTimerRunning(false)
  }
  // Function to stop the hint timer when needed

  const stopHintTimer = () => {
    setIsHintTimerRunning(false)
  }

  const changeTeamTurn = () => {
    const teamTurn = getState('teamTurn')
    teamTurn === 'red'
      ? setState('teamTurn', 'blue')
      : setState('teamTurn', 'red')
    setState('hintTimer', 15)
    setState('guessTimer', 20)
    stopGuessTimer()
    startHintTimer()
  }

  const decrementHintTimer = () => {
    const number = isNaN(getState('hintTimer') - 1)
      ? 0
      : getState('hintTimer') - 1
    console.log('hintTimer', number)

    setHintTimer(number, true)
  }

  // Function to decrement guess timer every second
  const decrementGuessTimer = () => {
    const number = isNaN(getState('guessTimer') - 1)
      ? 0
      : getState('guessTimer') - 1
    console.log('guessTimer', number)

    setGuessTimer(number, true)
  }

  // Effect to run hint timer and handle switching to guess timer
  useEffect(() => {
    let hintInterval: any

    if (isHintTimerRunning && hintTimer > 0 && isHost()) {
      hintInterval = setInterval(decrementHintTimer, 1000)
    }

    // Switch to guess timer when hint timer reaches 0
    if (hintTimer <= 0) {
      stopHintTimer()
      startGuessTimer()
      clearInterval(hintInterval)
    }

    return () => clearInterval(hintInterval)
  }, [isHintTimerRunning, hintTimer])

  // Effect to run guess timer
  useEffect(() => {
    let guessInterval: any

    if (isGuessTimerRunning && guessTimer > 0 && hintTimer <= 0 && isHost()) {
      guessInterval = setInterval(decrementGuessTimer, 1000)
    }

    if (guessTimer <= 0 && hintTimer <= 0) {
      stopGuessTimer()
      changeTeamTurn()
      clearInterval(guessInterval)
    }

    return () => clearInterval(guessInterval)
  }, [isGuessTimerRunning, guessTimer, hintTimer])

  //   useEffect(() => {
  //     setTimer(60)
  //     //   copyImage()
  //     try {
  //       // drawingAreaRef.current.reset()
  //     } catch (e) {}
  //     const intervalId = setInterval(() => {
  //       // copyImage()
  //       setTimer(getState('timer') - 1, true)
  //     }, 1000)
  //     // setIntervalId(intervalId)()
  //   }, [])

  useEffect(() => {
    const initGame = async () => {
      await insertCoin()

      // Pick a random word and init all states
      getRandomWords()
      setGuesses([], true)
      setState('hintTimer', 15)
      setState('guessTimer', 20)
      setState('teamTurn', 'blue')
      startHintTimer()
    }
    initGame()
  }, [])

  //   if (!currentWord) return <div>Loading...</div>

  const assignPlayerTeam = (player: any) => {
    if (!!!player || !!player?.state?.team) return
    if (redTeamPlayers.length < blueTeamPlayers.length) {
      player.setState('team', 'red')
      console.log(`${player?.state?.profile?.name} joined the red team`)
      player.setState('role', redTeamPlayers.length ? 'operative' : 'spymaster')
    } else {
      player.setState('team', 'blue')
      console.log(`${player?.state?.profile?.name} joined the blue team`)
      player.setState(
        'role',
        blueTeamPlayers.length ? 'operative' : 'spymaster',
      )
    }
  }

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
      return word.word === clickedWord?.word
    })
    if (!clickedWord.isRevealed) {
      const newArray = randomWords.slice()
      newArray[index].isRevealed = true
      setState('randomWords', newArray, true)

      const newCount = { ...cardCount }
      newCount[clickedWord.team] = cardCount[clickedWord.team] - 1
      setState('cartCount', { ...newCount })

      if (clickedWord.team === 'red') {
        return
      }
      if (clickedWord.team === 'blue') {
        return
      }
      if (clickedWord.team === 'black') {
        return
      }
      if (clickedWord.team === 'neutral') {
        return
      }
    }
  }

  useEffect(() => {
    const unAssignedPlayers = players.filter(
      (player: any) => !player?.state?.team,
    )
    unAssignedPlayers.forEach((player: any) => assignPlayerTeam(player))
    console.log(
      'players',
      players.map((player: any) => player?.state),
    )
  }, [players])

  return (
    <main className="flex min-h-screen flex-col items-center py-8 justify-between bg-gradient-to-b from-[#8d6bed] to-purple-600 relative">
      <div>
        <StatsBar />
        <div className="flex flex-col items-center gap-5">
          <StatusBar
            hintTimer={hintTimer}
            guessTimer={guessTimer}
            teamTurn={teamTurn}
          />
          <div className="flex justify-between items-start gap-10">
            <TeamArea team="red" cardCount={cardCount} players={players} />
            <WordGrid
              words={randomWords}
              player={myPlayer()}
              handleCardClick={revealCard}
            />
            <TeamArea team="blue" cardCount={cardCount} players={players} />
          </div>
          <InputBar />
        </div>
      </div>
    </main>
  )
}
