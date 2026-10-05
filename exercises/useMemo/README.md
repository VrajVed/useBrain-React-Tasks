# Exercise 4: useMemo

## What it does

`useMemo` remembers the result of an expensive calculation and only recomputes it when its dependencies change.

## Where it is used

- Filtering or sorting large lists
- Expensive data transformations
- Derived values that should stay stable

## Fun example

A magical number finder. You have millions of lottery tickets but only one is the winner. You do not want to scan them again every time the user toggles dark mode.

```jsx
import { useState, useMemo } from 'react'

function Lottery({ tickets, findWinner }) {
  const [dark, setDark] = useState(false)
  const winner = useMemo(() => findWinner(tickets), [tickets, findWinner])

  return (
    <div className={dark ? 'dark' : 'light'}>
      <p>Winner: {winner}</p>
      <button onClick={() => setDark(d => !d)}>Toggle theme</button>
    </div>
  )
}
```

## Your task

Open `MagicFinder.tsx`. The `findMagic` function runs on every render, even when only the theme changes. Wrap it in `useMemo` so it only runs when the `tickets` change.

## Rules

- Do not edit `MagicFinder.test.tsx`.
- Use `useMemo` with the correct dependency array.
