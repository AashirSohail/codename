import { useEffect, useState } from 'react'

const InputBar = ({ hintTimer, guessTimer, teamTurn }: any) => {
  useEffect(() => {
    if (hintTimer) {
      setMessage(`${teamTurn} spymaster(s) turn`)
    }
    if (guessTimer && hintTimer <= 0) {
      setMessage(`${teamTurn} operative(s) turn`)
    }
  }, [hintTimer, guessTimer, teamTurn])

  const [message, setMessage] = useState('')

  return (
    <div className="flex flex-row">
      <div className="flex flex-row justify-center items-center bg-white rounded-md w-fit px-8 py-1 font-semibold mr-4">
        {message}
      </div>
      <div className="w-[2.5rem] h-10 focus:outline-none py-1 rounded-lg font-semibold text-center bg-white border-4 border-yellow-300 mr-4">
        {hintTimer === 0 ? guessTimer : hintTimer}
      </div>
    </div>
  )
}

export default InputBar
