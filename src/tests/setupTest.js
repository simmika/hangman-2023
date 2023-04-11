import { render, screen } from '@testing-library/react'
import App from '../App'
import { getWord } from '../wordService'

jest.mock('./../wordService')

export async function setupTest(mockWord) {
  getWord.mockImplementation(async () => mockWord)
  render(<App />)
  await screen.findByTestId('App')
}
