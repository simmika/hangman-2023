import { render, screen } from '@testing-library/react'
import App from './App'
import { getWord } from './wordService'

beforeEach(async () => {
  getWord.mockImplementation(async () => 'hello')
  render(<App />)
  await screen.findByTestId('App')
})

jest.mock('./wordService')
describe('Initial state', () => {
  test('shows correct message', () => {
    const message = screen.getByText('Please enter your guess and submit')
    expect(message).toBeDefined()
  })
  test('shows underscores for every letter', () => {
    const hiddenWord = screen.getByText('_ _ _ _ _')
    expect(hiddenWord).toBeDefined()
  })
})
