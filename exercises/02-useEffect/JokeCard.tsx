import { useState } from 'react'

export default function JokeCard() {
  const [joke, setJoke] = useState<string | null>(null)

  fetch('https://official-joke-api.appspot.com/jokes/programming/random')
    .then(res => res.json())
    .then(data => {
      setJoke(data[0].setup + ' ' + data[0].punchline)
    })

  return (
    <div>
      <h2>Joke of the mount</h2>
      <p data-testid="joke">{joke ?? 'Loading...'}</p>
    </div>
  )
}
