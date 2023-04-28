import React from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { incorrectGuessesCount, isSolved } from './businessLogic'
import { Message } from './Message'
import { Img } from './Image'

export const AppRoot = ({ handleReset, word }) => {
  const [unsubmittedLetter, setUnsubmittedLetter] = React.useState('')
  const [submittedLetters, setSubmittedLetters] = React.useState([])

  const handleLetterChange = event => {
    setUnsubmittedLetter(
      event.target.value.toLowerCase().replaceAll(/[^a-zA-Z]+/g, ''),
    )
  }

  const handleLetterSubmit = e => {
    e.preventDefault()
    submittedLetters.push(unsubmittedLetter)
    setSubmittedLetters(submittedLetters)
    setUnsubmittedLetter('')
  }

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
            value={unsubmittedLetter}
            disabled={
              isSolved(word, submittedLetters) ||
              incorrectGuessesCount(word, submittedLetters) === 6
            }
          />
          <Button
            onClick={handleLetterSubmit}
            disabled={!unsubmittedLetter}
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
          <Message word={word} submittedLetters={submittedLetters} />
        </Stack>
      </Stack>
      <Stack>
        <h2>
          {word
            .split('')
            .map(l => (submittedLetters.includes(l) ? l : '_'))
            .join(' ')}
        </h2>
      </Stack>
      <Stack>
        <Img
          incorrectCount={incorrectGuessesCount(word, submittedLetters) + 1}
        />
      </Stack>
      <Stack className="col-lg-8 mx-auto">
        <Button
          variant="danger"
          onClick={async () => {
            await handleReset()
          }}
          data-testid="reset-playAgain-button"
        >
          {isSolved(word, submittedLetters) ||
          incorrectGuessesCount(word, submittedLetters) === 6
            ? 'PLAY AGAIN'
            : 'RESET'}
        </Button>
      </Stack>
    </div>
  )
}
