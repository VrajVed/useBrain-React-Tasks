# Exercise 2: useEffect

## What it does

`useEffect` runs side effects outside of render. It can run once, run when dependencies change, and return a cleanup function.

## Where it is used

- Fetching data from an API
- Subscribing to events
- Syncing with browser APIs like document title or localStorage

## Fun example

A joke card that fetches a random programming joke when it mounts.

```jsx
import { useState, useEffect } from 'react'

function JokeCard() {
  const [joke, setJoke] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch('https://official-joke-api.appspot.com/jokes/programming/random')
      .then(res => res.json())
      .then(data => {
        if (!cancelled) setJoke(data[0])
      })
    return () => { cancelled = true }
  }, [])

  return <p>{joke ? joke.setup + ' ' + joke.punchline : 'Loading...'}</p>
}
```

## Your task

Open `JokeCard.tsx`. It fetches a joke but has two bugs:

1. It fetches on every render, creating an infinite loop.
2. It does not clean up if the component unmounts before the fetch finishes.

Fix both bugs using `useEffect`.

## Rules

- Do not edit `JokeCard.test.tsx`.
- The component must use `useEffect`.
