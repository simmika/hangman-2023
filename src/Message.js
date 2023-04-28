import {
  isSolved,
  incorrectGuessesCount,
  isLastGuessCorrect,
} from './businessLogic'

const GenericMessage = ({ type, message }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  )
}

const YouLostMessage = ({ word }) => {
  return (
    <div className={`alert alert-danger`} role="alert">
      <h4 className="alert-heading">
        SORRY YOU LOST{' '}
        <span role="img" aria-label="loose">
          👾
        </span>
      </h4>
      <p>
        The word was <strong>{word}</strong>. Better luck next time!
      </p>
      <p>
        <small>
          If you want to try again, click the <strong>"PLAY AGAIN"</strong>{' '}
          button below.
        </small>
      </p>
    </div>
  )
}

const YouWonMessage = ({ word }) => {
  return (
    <div className={`alert alert-success`} role="alert">
      <h4 className="alert-heading">
        CONGRATULATIONS!{' '}
        <span role="img" aria-label="win">
          🏆
        </span>{' '}
      </h4>
      <p>
        You won the game! The correct word is <strong>{word}</strong>
      </p>
      <p>
        <small>
          If you want to play again, click the <strong>"PLAY AGAIN"</strong>{' '}
          button below.
        </small>
      </p>
    </div>
  )
}

export const Message = ({ word, submittedLetters }) => {
  const incorrectGuessCount = incorrectGuessesCount(word, submittedLetters)

  if (submittedLetters.length === 0) {
    return (
      <GenericMessage
        type={'primary'}
        message={'Please enter your guess and submit'}
      />
    )
  }
  if (incorrectGuessCount === 6) {
    return <YouLostMessage word={`${word.toUpperCase()}`} />
  }
  if (!isLastGuessCorrect(word, submittedLetters) && incorrectGuessCount < 6) {
    return (
      <GenericMessage type={'danger'} message={'Your guess is incorrect'} />
    )
  }
  if (isSolved(word, submittedLetters)) {
    return <YouWonMessage word={`${word.toUpperCase()}`} />
  }
  if (isLastGuessCorrect(word, submittedLetters)) {
    return <GenericMessage type="success" message="Your guess is correct" />
  }

  return
}
