import { screen, fireEvent, act } from '@testing-library/react'
import { setupTest } from './setupTest'
import userEvent from '@testing-library/user-event'

const mockWordToGuess = 'hello'

describe('Correct letter submit', () => {
  it.each([
    ['e', '_ e _ _ _'],
    ['l', '_ _ l l _'],
    ['h', 'h _ _ _ _'],
  ])(
    'reveals letter %p in the correct position with success message - %p',
    async (letter, result) => {
      await setupTest(mockWordToGuess)

      const input = screen.getByPlaceholderText('Your guess')
      const button = screen.getByText('Submit')

      fireEvent.change(input, { target: { value: letter } })
      expect(input.value).toEqual(letter)
      expect(button).toBeEnabled()

      fireEvent.click(button)
      expect(screen.getByText(result)).toBeDefined()
      expect(screen.getByText('Your guess is correct')).toBeDefined()
      expect(screen.getByAltText('state').src).toContain('hangman1')
    },
  )
})

describe('Incorrect letter submit', () => {
  it.each(['a', 'r', 't'])(
    'doesn\t reveal %p letter and shows incorrect guess message',
    async letter => {
      await setupTest(mockWordToGuess)

      const input = screen.getByPlaceholderText('Your guess')
      const button = screen.getByText('Submit')

      fireEvent.change(input, { target: { value: letter } })
      expect(input.value).toEqual(letter)
      expect(button).toBeEnabled()

      fireEvent.click(button)
      expect(screen.getByText('_ _ _ _ _')).toBeDefined()
      expect(screen.getByText('Your guess is incorrect')).toBeDefined()
      expect(screen.getByAltText('state').src).toContain('hangman2')
    },
  )
})

describe('Non-letter or upper-case inputs are validated', () => {
  it.each([
    ['2', ''],
    ['R', 'r'],
    ['tr', 't'],
  ])('%p changed to %p', async (letter, result) => {
    await setupTest(mockWordToGuess)

    const input = screen.getByPlaceholderText('Your guess')

    act(() => {
      userEvent.type(input, letter)
    })

    expect(input.value).toEqual(result)
  })
})

describe('Add and remove letter', () => {
  test('should revent to initial state - submit disabled', async () => {
    await setupTest(mockWordToGuess)

    const letter = 'a'
    const empty = ''

    const input = screen.getByPlaceholderText('Your guess')
    const button = screen.getByText('Submit')

    fireEvent.change(input, { target: { value: letter } })
    expect(input.value).toEqual(letter)
    expect(button).toBeEnabled()

    fireEvent.change(input, { target: { value: empty } })
    expect(input.value).toEqual(empty)
    expect(button).toBeDisabled()
  })
})
