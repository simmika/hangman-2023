import { render, screen, act } from '@testing-library/react'
import App from '../App'
import { getWord } from '../wordService'

jest.mock('./../wordService')

export async function setupTest(mockWord) {
  getWord.mockImplementation(async () => mockWord)
  act(() => {
    render(<App />)
  })

  await screen.findByTestId('App')
}
