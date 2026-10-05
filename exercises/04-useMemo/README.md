# 04 useMemo

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

## The three parts

Do them in order. Each one is a folder in here with its own task and tests.

1. **a: Lucky ticket, skipping a slow calculation**
2. **b: Meme search, getting the dependencies right**
3. **c: Dashboard, keeping an object the same**

Check one part with `npm test -- 04-useMemo/a` (or `/b`, `/c`). Check all three with `npm test -- 04-useMemo`.

When all three pass, answer `NOTES.md` in this folder.
