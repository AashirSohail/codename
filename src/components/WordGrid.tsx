import { useEffect } from 'react'

const styles: any = {
  red: 'border-red-500',
  blue: 'border-blue-500',
  black: 'border-black-500',
  neutral: 'border-yellow-500',
}

const WordGrid = ({ words, player, handleCardClick }: any) => {
  useEffect(() => {}, [words])

  return (
    <div className="grid gap-4 grid-cols-5 grid-rows-5">
      {!!words &&
        words.map((word: any) => (
          // Add team based click check
          <div
            style={{
              pointerEvents: `${
                player?.state?.role === 'operative' ? 'auto' : 'none'
              }`,
            }}
            onClick={() => handleCardClick(word)}
            key={word?.word}
            className={`
            capitalize px-4 py-6 text-center 
            ${word?.isRevealed ? 'border-4' : 'border-2'}
            ${styles[word?.team]}
            ${
              player?.state?.role === 'operative'
                ? 'cursor-pointer'
                : 'cursor-not-allowed'
            }
            `}
          >
            {word?.word}
          </div>
        ))}
    </div>
  )
}

export default WordGrid
