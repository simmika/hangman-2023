import { screen, fireEvent } from '@testing-library/react'
import { setupTest } from './setupTest'
import 'jest-location-mock'

const mockWordToGuess = 'hello'

describe('Reset button', () => {
  test('reloads the app and resets the initial state', async () => {
    await setupTest(mockWordToGuess)

    let letter = 'e'
    let input = screen.getByPlaceholderText('Your guess')
    let submitButton = screen.getByText('Submit')
    let resetButton = screen.getByTestId('reset-playAgain-button')

    fireEvent.change(input, { target: { value: letter } })
    fireEvent.click(submitButton)
    expect(screen.getByText('Your guess is correct')).toBeDefined()
    expect(screen.getByText('_ e _ _ _')).toBeDefined()

    fireEvent.click(resetButton)
    expect(window.location.reload).toHaveBeenCalled()
  })
})
