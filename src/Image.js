import { incorrectGuessesCount } from './businessLogic'

// prapasinti jau išskaičiuotą guessees Counta

export const Img = ({ word, submittedLetters }) => (
  <img
    className="mx-auto"
    alt="state"
    src={`./img/hangman${
      incorrectGuessesCount(word, submittedLetters) + 1
    }.png`}
    width="200"
    height="400"
  />
)
