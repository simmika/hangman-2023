import { screen, fireEvent } from '@testing-library/react'
import { setupTest } from './setupTest'

const mockWordToGuess = 'a'

describe('State of the won game', () => {
  test('reveals the word with congratulation message and disables submit and input elements', async () => {
    await setupTest(mockWordToGuess)

    let letter = 'a'
    let input = screen.getByPlaceholderText('Your guess')
    let submitButton = screen.getByText('Submit')
    let playAgainButton = screen.getByTestId('reset-playAgain-button')

    fireEvent.change(input, { target: { value: letter } })
    fireEvent.click(submitButton)

    let message = screen.getByRole('alert').textContent

    expect(message).toContain('The correct word is A')
    expect(input).toBeDisabled()
    expect(submitButton).toBeDisabled()
    // expect(screen.getByText('_')).not.toBeInTheDocument()

    expect(playAgainButton).toBeEnabled()
    expect(playAgainButton).toHaveTextContent('PLAY AGAIN')
  })
})
