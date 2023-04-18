import { screen, fireEvent, act } from '@testing-library/react'
import { setupTest } from './setupTest'
import 'jest-location-mock'

const mockWordToGuess = 'hello'

describe('Reset button', () => {
  test('reloads the app and resets the initial state', async () => {
    await setupTest(mockWordToGuess)

    const letter = 'e'
    const input = screen.getByPlaceholderText('Your guess')
    const submitButton = screen.getByText('Submit')
    const resetButton = screen.getByTestId('reset-playAgain-button')

    act(() => {
      fireEvent.change(input, { target: { value: letter } })
      fireEvent.click(submitButton)
    })

    expect(screen.getByText('Your guess is correct')).toBeDefined()
    expect(screen.getByText('_ e _ _ _')).toBeDefined()

    act(() => {
      fireEvent.click(resetButton)
    })

    await screen.findByText('Please enter your guess and submit')
  })
})
