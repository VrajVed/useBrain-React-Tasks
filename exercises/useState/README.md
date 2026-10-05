# Exercise 1: useState

## What it does

`useState` lets a component remember a value between renders. When you call the setter, React re-renders the component with the new value.

## Where it is used

- Counters and quantity pickers
- Form inputs
- Toggle UI state like open/close menus

## Fun example

A pizza slice counter. Click "+" to add a slice, click "-" to remove one.

```jsx
import { useState } from 'react'

function SliceCounter() {
  const [slices, setSlices] = useState(0)

  return (
    <div>
      <p>Slices: {slices}</p>
      <button onClick={() => setSlices(slices + 1)}>+</button>
      <button onClick={() => setSlices(slices - 1)}>-</button>
    </div>
  )
}
```

## Your task

Open `Counter.tsx`. It uses a normal variable, so the buttons do nothing. Replace it with `useState` so the counter updates on screen.

## Rules

- Do not edit `Counter.test.tsx`.
- Do not use `let` to store the count.
