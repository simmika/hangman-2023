import React from 'react'
import './App.css'
import { getWord } from './wordService'
import DisplayPlayingApp from './PlayingApp'

export default function App() {
  const [word, setWord] = React.useState()
  const [unsubmittedLetter, setUnsubmittedLetter] = React.useState('')
  const [submittedLetters, setSubmittedLetters] = React.useState([])

  React.useEffect(() => {
    getWord().then(result => {
      setWord(result)
      // console.log('setWord ', result)
    })
  }, [])

  const handleLetterChange = event => {
    setUnsubmittedLetter(
      event.target.value.toLowerCase().replaceAll(/[^a-zA-Z]+/g, ''),
    )
  }

  const handleReset = async () => {
    getWord().then(result => setWord(result))
    setUnsubmittedLetter('')
    setSubmittedLetters([])
  }

  const handleLetterSubmit = e => {
    e.preventDefault()
    submittedLetters.push(unsubmittedLetter)
    setSubmittedLetters(submittedLetters)
    setUnsubmittedLetter('')
  }

  if (!word) {
    return null
  }

  return (
    <DisplayPlayingApp
      submittedLetters={submittedLetters}
      handleLetterSubmit={handleLetterSubmit}
      handleLetterChange={handleLetterChange}
      handleReset={handleReset}
      unsubmittedLetter={unsubmittedLetter}
      word={word}
    />
  )
}
