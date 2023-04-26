import React from 'react'
import './App.css'
import { getWord } from './wordService'
import { AppRoot } from './AppRoot'

export default function App() {
  const [word, setWord] = React.useState()

  React.useEffect(() => {
    getWord().then(result => {
      setWord(result)
    })
  }, [])

  const handleReset = () => {
    getWord().then(result => setWord(result))
  }
  if (!word) {
    return null
  }

  return <AppRoot handleReset={handleReset} word={word} key={word} />
}
