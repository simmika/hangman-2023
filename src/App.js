import React from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import './App.css'
import { getWord } from './wordService'

const Message = ({ guessSuccess, guessesCount, word, guessWord }) => {
  const messageObj = { type: '', message: '' }
  if (guessSuccess === null) {
    messageObj.type = 'primary'
    messageObj.message = 'Please enter your guess and submit'
  } else if (guessesCount === 6) {
    messageObj.type = 'danger'
    messageObj.message = `The word was ${word.toUpperCase()}.`
    return (
      <div className={`alert alert-${messageObj.type}`} role="alert">
        <h4 className="alert-heading">
          SORRY YOU LOST{' '}
          <span role="img" aria-label="loose">
            👾
          </span>
        </h4>
        <p>
          The word was <strong>{word.toUpperCase()}</strong>. Better luck next
          time!
        </p>
        <hr></hr>
        <p>
          <small>
            If you want to try again, click the <strong>"PLAY AGAIN"</strong>{' '}
            button below.
          </small>
        </p>
      </div>
    )
  } else if (!guessSuccess && guessesCount < 6) {
    messageObj.type = 'danger'
    messageObj.message = 'Your guess is incorrect'
  } else if (!guessWord.includes('_')) {
    messageObj.type = 'success'
    messageObj.message = `You won the game! The correct word is ${word.toUpperCase()}`
    return (
      <div className={`alert alert-${messageObj.type}`} role="alert">
        <h4 className="alert-heading">
          CONGRATULATIONS!{' '}
          <span role="img" aria-label="win">
            🏆
          </span>{' '}
        </h4>
        <p>{messageObj.message}</p>
        <hr></hr>
        <p>
          <small>
            If you want to play again, click the <strong>"PLAY AGAIN"</strong>{' '}
            button below.
          </small>
        </p>
      </div>
    )
  } else if (guessSuccess) {
    messageObj.type = 'success'
    messageObj.message = 'Your guess is correct'
  }
  return (
    <div className={`alert alert-${messageObj.type}`} role="alert">
      {messageObj.message}
    </div>
  )
}

const Img = ({ guessesCount }) => (
  <img
    className="mx-auto"
    alt="state"
    src={`./img/hangman${guessesCount + 1}.png`}
    width="200"
    height="400"
  />
)

const DisplayPlayingApp = ({
  handleLetterSubmit,
  handleLetterChange,
  guessLetter,
  guessSuccess,
  guessWord,
  guessesCount,
  word,
}) => {
  return (
    <div className="App" data-testid="App">
      <Form /* onSubmit={handleLetterSubmit}*/>
        <Stack direction="horizontal" gap={3} className="col-md-8 mx-auto">
          <Form.Control
            onChange={handleLetterChange}
            type="letter"
            placeholder="Your guess"
            size="lg"
            maxLength="1"
            value={guessLetter}
            disabled={!guessWord?.includes('_') || guessesCount === 6}
          />
          <Button
            onClick={handleLetterSubmit}
            disabled={!guessLetter}
            variant="primary"
            type="submit"
            size="lg"
          >
            Submit
          </Button>
        </Stack>
      </Form>
      <Stack className="col-md-8 mx-auto" style={{ marginTop: '1rem' }}>
        <Stack>
          <Message
            guessSuccess={guessSuccess}
            guessesCount={guessesCount}
            word={word}
            guessWord={guessWord}
          />
        </Stack>
      </Stack>
      <Stack>
        <h2>{guessWord?.split('').map(x => x + ' ')}</h2>
      </Stack>
      <Stack>
        <Img guessesCount={guessesCount} />
      </Stack>
      <Stack className="col-lg-8 mx-auto">
        <Button
          variant="danger"
          onClick={() => window.location.reload(false)}
          data-testid="reset-playAgain-button"
        >
          {!guessWord?.includes('_') || guessesCount === 6
            ? 'PLAY AGAIN'
            : 'RESET'}
        </Button>
      </Stack>
    </div>
  )
}

export default function App() {
  const [word, setWord] = React.useState() // nebutinas ???? pasichekinti
  const [guessLetter, setGuessLetter] = React.useState('')
  // reikia array'aus spėjimams
  const [guessWord, setGuessWord] = React.useState() //atsikratyti :D
  const [guessesCount, setGuessesCount] = React.useState(0) // išskaičiuoti be state'o
  const [guessSuccess, setGuessSuccess] = React.useState(null) // išskaičiuoti kitoj vietoj :)

  React.useEffect(() => {
    getWord().then(result => {
      setWord(result)
      setGuessWord('_'.repeat(result.length))
      // console.log('setWord ', result)
    })
  }, []) // Užsetint žodį reikia tikpačioj pradžioj vieną kartą,

  const handleLetterChange = event => {
    setGuessLetter(
      event.target.value.toLowerCase().replaceAll(/[^a-zA-Z]+/g, ''),
    )
  }

  const handleLetterSubmit = e => {
    e.preventDefault()
    if (word.includes(guessLetter)) {
      const gameWord = word
        .split('')
        .map(letter => (letter !== guessLetter ? '_' : letter))
      setGuessWord(
        gameWord
          .map((x, i) => (guessWord[i] === '_' ? x : guessWord[i]))
          .join(''),
      )
      setGuessSuccess(true)
    } else {
      setGuessSuccess(false)
      setGuessesCount(c => c + 1)
    }
    setGuessLetter('')
  }
  if (!word) {
    return null
  }
  return (
    <DisplayPlayingApp
      handleLetterSubmit={handleLetterSubmit}
      handleLetterChange={handleLetterChange}
      guessLetter={guessLetter} // gal galima atsikratyti
      guessSuccess={guessSuccess} //gal galima atsikratyti
      guessWord={guessWord} //gal galima atsikratyti
      guessesCount={guessesCount} // gal galima atsikratyti
      word={word}
    />
  )
}

/*
guessWord(word, []){
    if Simona, [] => _ _ _ _ _ _
    if Simona, [i] => _ i _ _ _ _
    if Simona, [i, y] => _ i _ _ _ _
     return 
}


wrongGuessesCount(word, []){
  word pasiversti į array
  filter/reduce
  return number
}

rightGuessesCount() {
  
}

isSolved(){

}

isGuessSuccess(){
includes [paskutine speta raide] su word'e raidem
}


*/
