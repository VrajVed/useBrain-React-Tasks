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

Open `MagicFinder.tsx`. Run `npm run dev`, pick exercise 04, and click Toggle mode a few times. It feels laggy, because `findMagic` is slow and runs on **every** render, even though only the colour changed. Open the DevTools **Console** and watch it print every time.

Wrap it in `useMemo` so it only runs when `tickets` or `findMagic` change. After your fix, toggling should feel instant and the console should stay quiet.

## Check your work

```bash
npm test -- 04-useMemo
```

## Rules

- Do not edit `MagicFinder.test.tsx`.
- Use `useMemo` with the correct dependency array.
