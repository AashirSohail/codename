export function generateUniqueNumbers(min: number, max: number, count: number) {
  if (max - min < count) {
    console.error('Invalid range or count')
    return []
  }

  const numbers: any[] = []

  while (numbers.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min

    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber)
    }
  }

  return numbers
}

export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const Team = {
  BLUE: 'blue',
  RED: 'red',
  BLACK: 'black',
  NEUTRAL: 'neutral',
}

export const assignTeams = (wordsArray: any) => {
  let red = 0
  const RED_MAX = 8
  let blue = 0
  const BLUE_MAX = 9
  let neutral = 0
  const NEUTRAL_MAX = 7
  let black = 0
  const BLACK_MAX = 1

  const w = wordsArray.map((word: any) => {
    if (red < RED_MAX) {
      word.team = Team.RED

      red++
    } else if (blue < BLUE_MAX) {
      word.team = Team.BLUE

      blue++
    } else if (neutral < NEUTRAL_MAX) {
      word.team = Team.NEUTRAL
      neutral++
    } else if (black < BLACK_MAX) {
      word.team = Team.BLACK
      black++
    }
    return word
  })

  const shuffledArray = shuffleArray(w)

  return { shuffledArray, count: { red, blue, black, neutral } }
}
