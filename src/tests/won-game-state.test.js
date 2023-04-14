import { screen, fireEvent } from '@testing-library/react'
import { setupTest } from './setupTest'

const mockWordToGuess = 'a'

describe('State of the won game', () => {
  test('reveals the word with congratulation message and disables submit and input elements', async () => {
    await setupTest(mockWordToGuess)

    const letter = 'a'
    const input = screen.getByPlaceholderText('Your guess')
    const submitButton = screen.getByText('Submit')
    const playAgainButton = screen.getByTestId('reset-playAgain-button')

    fireEvent.change(input, { target: { value: letter } })
    fireEvent.click(submitButton)

    const message = screen.getByRole('alert').textContent

    expect(message).toContain('The correct word is A')
    expect(input).toBeDisabled()
    expect(submitButton).toBeDisabled()
    expect(screen.queryByText('_')).toBeNull()

    expect(playAgainButton).toBeEnabled()
    expect(playAgainButton).toHaveTextContent('PLAY AGAIN')
  })
})
