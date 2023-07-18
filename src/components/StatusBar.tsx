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
    <div className="flex flex-row justify-center items-center bg-white rounded-md w-fit px-8 py-1 font-semibold">
      {message}
    </div>
  )
}

export default InputBar
