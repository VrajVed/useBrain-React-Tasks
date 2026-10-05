import { useState } from 'react'

type Joke = { setup: string; punchline: string }

export default function JokeCard() {
  const [joke, setJoke] = useState<string | null>(null)

  fetch('/jokes.json')
    .then(res => res.json())
    .then((jokes: Joke[]) => {
      const pick = jokes[Math.floor(Math.random() * jokes.length)]
      setJoke(pick.setup + ' ' + pick.punchline)
    })

  return (
    <div>
      <h2>Joke of the mount</h2>
      <p data-testid="joke">{joke ?? 'Loading...'}</p>
    </div>
  )
}
