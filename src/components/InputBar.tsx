import { useState } from 'react'
import PillButton from '@/components/PillButton'

const InputBar = ({
  guessTimer,
  hintTimer,
  teamTurn,
  me,
  hint,
  setHint,
  isHintGiven,
  setIsHintGiven,
  setTeamGuessCount,
  setEndGuessing,
}: any) => {
  const [text, setText] = useState('')
  const [count, setCount] = useState('0')

  const submitCount = () => {
    if (!text || !count) return
    setTeamGuessCount(count)
    setHint({ count, text })
    setIsHintGiven(true)
  }

  return (
    <>
      {me?.role === 'spymaster' && me?.team === teamTurn && hintTimer > 0 ? (
        <div className="flex flex-row justify-center items-center mt-4">
          <div className=" mr-4">
            <input
              className="w-[20rem] focus:outline-none py-2 rounded-lg px-2 font-semibold pl-3"
              type="text"
              placeholder="Type your clue here"
              onChange={({ target }) => setText(target.value)}
            />
          </div>
          <div className="mr-4">
            <input
              className="w-[3rem] focus:outline-none py-2 rounded-lg px-2 font-semibold"
              type="number"
              min="1"
              onChange={({ target }) => setCount(target.value)}
            />
          </div>
          <PillButton
            text="Give Clue"
            handleButtonClick={submitCount}
            className="h-10 w-24 bg-green-500 font-semibold"
          />
        </div>
      ) : (
        <>
          {isHintGiven && (
            <div className="flex flex-row justify-center items-center mt-4">
              <div className="w-[20rem] h-10 focus:outline-none py-1 rounded-lg px-2 font-semibold pl-3 bg-white border-4 border-yellow-300 mr-4">
                {hint?.text}{' '}
              </div>
              <div className="w-[2.5rem] h-10 focus:outline-none py-1 rounded-lg px-2 font-semibold pl-3 bg-white border-4 border-yellow-300 mr-4">
                {hint?.count}
              </div>
              {me?.role !== 'spymaster' && me?.team === teamTurn && (
                <PillButton
                  text="End guessing"
                  handleButtonClick={() => {
                    setEndGuessing(true)
                  }}
                  className="h-10 w-32 bg-green-500 font-semibold"
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default InputBar
