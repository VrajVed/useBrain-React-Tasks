# 01 useState

## What it does

`useState` lets a component remember a value between renders. When you call the setter, React re-renders the component with the new value.

From the Web Dev Head's notes: whenever a state is changed, React re-renders the entire component. A normal `let` variable is created fresh on every render, so it can never remember anything.

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

## The three parts

Do them in order. Each one is a folder in here with its own task and tests.

1. **a: Slice counter, a normal variable vs state**
2. **b: Slice party, the updater function**
3. **c: Todo list, new arrays and objects instead of changing them**

Check one part with `npm test -- 01-useState/a` (or `/b`, `/c`). Check all three with `npm test -- 01-useState`.

When all three pass, answer `NOTES.md` in this folder.
