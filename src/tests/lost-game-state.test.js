import { screen, fireEvent } from '@testing-library/react'
import { setupTest } from './setupTest'

const mockWordToGuess = 'hello'

describe('State of the lost game', () => {
  test('reveals the word with lost message and disables submit and input elements', async () => {
    await setupTest(mockWordToGuess)

    const incorrectLetter = 'a'
    const input = screen.getByPlaceholderText('Your guess')
    const submitButton = screen.getByText('Submit')
    const playAgainButton = screen.getByTestId('reset-playAgain-button')

    for (let i = 0; i < 6; i++) {
      fireEvent.change(input, { target: { value: incorrectLetter } })
      fireEvent.click(submitButton)
    }

    const msg = screen.getByRole('alert').textContent

    expect(msg).toEqual(
      'SORRY YOU LOST 👾The word was HELLO. Better luck next time!If you want to try again, click the "PLAY AGAIN" button below.',
    )
    expect(input).toBeDisabled()
    expect(screen.getByText('_ _ _ _ _')).toBeDefined()
    expect(submitButton).toBeDisabled()
    expect(playAgainButton).toBeEnabled()
    expect(playAgainButton).toHaveTextContent('PLAY AGAIN')
  })
})
