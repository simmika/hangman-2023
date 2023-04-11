import { screen } from '@testing-library/react'
import { setupTest } from './setupTest'

const mockWordToGuess = 'hello'

describe('Initial state', () => {
  test('shows correct message', async () => {
    await setupTest(mockWordToGuess)
    expect(screen.getByText('Please enter your guess and submit')).toBeDefined()
  })

  test('shows underscores for every letter', async () => {
    await setupTest(mockWordToGuess)
    expect(
      screen.getByText('_ '.repeat(mockWordToGuess.length).trim()),
    ).toBeDefined()
  })

  test('submit button is disabled', async () => {
    await setupTest(mockWordToGuess)
    expect(screen.getByText('Submit')).toBeDisabled()
  })

  test('shows correct image', async () => {
    await setupTest(mockWordToGuess)
    expect(screen.getByAltText('state').src).toContain('hangman1')
  })

  test('reset button is enabled', async () => {
    await setupTest(mockWordToGuess)
    expect(screen.getByText('RESET')).toBeEnabled()
  })

  test('shows correct placeholder', async () => {
    await setupTest(mockWordToGuess)
    expect(screen.getByPlaceholderText('Your guess')).toBeDefined()
  })
})
