import { screen, fireEvent } from '@testing-library/react'
import { setupTest } from './setupTest'

const mockWordToGuess = 'hello'

describe('Changing the image', () => {
  test('after each wrong guess, the relevant image is revealed', async () => {
    await setupTest(mockWordToGuess)

    let incorrectLetter = 'a'
    let input = screen.getByPlaceholderText('Your guess')
    let submitButton = screen.getByText('Submit')

    for (let i = 2; i < 8; i++) {
      fireEvent.change(input, { target: { value: incorrectLetter } })
      fireEvent.click(submitButton)
      expect(screen.getByAltText('state').src).toContain(`hangman${i}`)
    }
  })
})
