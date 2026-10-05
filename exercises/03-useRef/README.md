# Exercise 3: useRef

## What it does

`useRef` gives you a box called `ref.current` that React keeps safe between renders. Changing what is inside the box does **not** re-render the component.

From the Web Dev Head's notes: it fixes the problem where `let a = 0` goes back to `0` every time the component re-renders.

Two common uses:

1. **Remember a value without showing it.** Timer IDs, previous values, counters for debugging.
2. **Grab a real DOM element.** Put `ref={btnRef}` on a tag, then use `btnRef.current` like you would in plain JS.

## Where it is used

- Holding a `setInterval` / `setTimeout` ID so you can clear it later
- Focusing an input when a page opens
- Scrolling to an element
- Measuring the size of an element

## Fun example

Paint a button red as soon as it appears, straight through the DOM.

```jsx
function RedButton() {
  const btnRef = useRef(null)

  useEffect(() => {
    btnRef.current.style.backgroundColor = 'red'
  }, [])

  return <button ref={btnRef}>I am red</button>
}
```

## useRef vs useState

| | `useState` | `useRef` |
|---|---|---|
| Survives re-renders | yes | yes |
| Changing it re-renders the component | yes | **no** |
| Use it for | things shown on screen | things the screen does not need |

## Your task

Open `Stopwatch.tsx`. Run `npm run dev`, pick exercise 03, press Start, then Stop. It does not stop. Press Start again and it speeds up.

The bug: `let intervalId` is a normal variable, so it is created fresh (as `null`) on every render. By the time you press Stop, the ID of the running interval is gone.

Fix it:

1. Keep the interval ID in a `useRef`, so Stop can clear the right interval.
2. Clear the interval if the stopwatch disappears (unmounts). Think about which hook gives you a cleanup function.

## Check your work

```bash
npm test -- 03-useRef
```

## Rules

- Do not edit `Stopwatch.test.tsx`.
- Use `useRef` for the interval ID.
