# Exercise 3: useRef

## What it does

`useRef` gives you a box that keeps the same reference across renders. Changing it does not re-render the component.

## Where it is used

- Holding a timer ID
- Referencing DOM nodes
- Keeping previous values without causing re-renders

## Fun example

A stopwatch. Start, stop, and record lap times. The interval ID must survive re-renders without triggering them.

```jsx
import { useState, useEffect, useRef } from 'react'

function Stopwatch() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setTime(t => t + 1), 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  // ...
}
```

## Your task

Open `Stopwatch.tsx`. It stores the interval ID in a normal variable, so it is lost on every re-render. Use `useRef` to hold the interval ID and `useEffect` to start/stop the timer and clean up on unmount.

## Rules

- Do not edit `Stopwatch.test.tsx`.
- Use `useRef` for the interval ID.
