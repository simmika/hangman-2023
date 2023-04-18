export function incorrectGuessesCount(word, submittedLetters) {
  return submittedLetters
    ? submittedLetters.filter(l => !word.includes(l)).length
    : 0
}

export function isLastGuessCorrect(word, submittedLetters) {
  const lastGuess = submittedLetters[submittedLetters.length - 1]
  return word.split('').includes(lastGuess)
}

export function isSolved(word, submittedLetters) {
  const correctGuesses = word
    .split('')
    .filter(l => submittedLetters.includes(l))

  return word.length === correctGuesses.length
}
