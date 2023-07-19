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

function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function Home() {
  const players = usePlayersList(true)

  //   const [guessIntervalId, setGuessIntervalId] = useState<any>(null)
  //   const [hintIntervalId, setHintIntervalId] = useState<any>(null)
  //   const playersThatHaveGuessed = usePlayersState('guessed')

  const [hintTimer, setHintTimer] = useMultiplayerState('hintTimer', 15)
  const [guessTimer, setGuessTimer] = useMultiplayerState('guessTimer', 20)
  const [isHintTimerRunning, setIsHintTimerRunning] = useMultiplayerState(
    'isHintTimerRunning',
    false,
  )
  const [isGuessTimerRunning, setIsGuessTimerRunning] = useMultiplayerState(
    'isGuessTimerRunning',
    false,
  )
  const [isHintGiven, setIsHintGiven] = useMultiplayerState(
    'isHintGiven',
    false,
  )
  const [endGuessing, setEndGuessing] = useMultiplayerState(
    'endGuessing',
    false,
  )

  const [hint, setHint] = useMultiplayerState('guesses', { text: '', count: 0 })
  const [cardCount, setCardCount] = useMultiplayerState('cardCount', {
    black: 1,
    blue: 9,
    neutral: 6,
    red: 8,
  })
  const [teamGuessCount, setTeamGuessCount] = useMultiplayerState(
    'teamGuessCount',
    0,
  )
  const randomWords = getState('randomWords')

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
  }, [players])

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
    setCardCount(count)
    return shuffledArray
  }

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
    setHint({ text: '', count: 0 })
    setIsHintGiven(false)
    setEndGuessing(false)
  }

  const decrementHintTimer = () => {
    const number = isNaN(getState('hintTimer') - 1)
      ? 0
      : getState('hintTimer') - 1

    setHintTimer(number, true)
  }

  // Function to decrement guess timer every second
  const decrementGuessTimer = () => {
    const number = isNaN(getState('guessTimer') - 1)
      ? 0
      : getState('guessTimer') - 1

    setGuessTimer(number, true)
  }

  // Effect to run hint timer and handle switching to guess timer
  useEffect(() => {
    let hintInterval: any

    if (isHintTimerRunning && hintTimer > 0 && isHost() && !isHintGiven) {
      hintInterval = setInterval(decrementHintTimer, 1000)
    }

    // Switch to guess timer when hint timer reaches 0
    if (isHintGiven || hintTimer <= 0) {
      isHintGiven && setHintTimer(0, true)
      stopHintTimer()
      startGuessTimer()
      clearInterval(hintInterval)
    }

    return () => clearInterval(hintInterval)
  }, [isHintTimerRunning, hintTimer, isHintGiven])

  // Effect to run guess timer
  useEffect(() => {
    let guessInterval: any
    if (
      isGuessTimerRunning &&
      !isHintTimerRunning &&
      isHost() &&
      !endGuessing
    ) {
      guessInterval = setInterval(decrementGuessTimer, 1000)
    }

    if (endGuessing || (guessTimer <= 0 && hintTimer <= 0)) {
      endGuessing && setGuessTimer(0, true)
      stopGuessTimer()
      changeTeamTurn()
      clearInterval(guessInterval)
    }

    return () => clearInterval(guessInterval)
  }, [isGuessTimerRunning, guessTimer, hintTimer, endGuessing])

  useEffect(() => {
    const initGame = async () => {
      await insertCoin()

      // Pick a random word and init all states
      getRandomWords()
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

  const revealCard = (clickedWord: any) => {
    const index = randomWords.findIndex((word: any) => {
      return word.word === clickedWord?.word
    })
    if (!clickedWord.isRevealed && teamGuessCount > 0) {
      const newArray = randomWords.slice()
      newArray[index].isRevealed = true
      setState('randomWords', newArray, true)

      const newCount = { ...cardCount }
      newCount[clickedWord.team] = cardCount[clickedWord.team] - 1
      setCardCount({ ...newCount })

      setTeamGuessCount(teamGuessCount - 1)

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
            <TeamArea
              team="red"
              cardCount={cardCount}
              players={players}
              me={myPlayer()}
              hintTimer={hintTimer}
            />
            <WordGrid
              words={randomWords}
              teamTurn={teamTurn}
              hintTimer={hintTimer}
              guessTimer={guessTimer}
              player={myPlayer()}
              handleCardClick={revealCard}
            />
            <TeamArea
              team="blue"
              cardCount={cardCount}
              players={players}
              me={myPlayer()}
              hintTimer={hintTimer}
            />
          </div>
          <InputBar
            guessTimer={guessTimer}
            hintTimer={hintTimer}
            teamTurn={teamTurn}
            me={myPlayer()?.state}
            hint={hint}
            setHint={setHint}
            isHintGiven={isHintGiven}
            setIsHintGiven={setIsHintGiven}
            setTeamGuessCount={setTeamGuessCount}
            setEndGuessing={setEndGuessing}
          />
        </div>
      </div>
    </main>
  )
}
