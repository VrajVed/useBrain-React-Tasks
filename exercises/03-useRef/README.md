# 03 useRef

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

## The three parts

Do them in order. Each one is a folder in here with its own task and tests.

1. **a: Search box, grabbing a DOM element**
2. **b: Stopwatch, remembering a timer id**
3. **c: Send later, the latest value inside a timer**

Check one part with `npm test -- 03-useRef/a` (or `/b`, `/c`). Check all three with `npm test -- 03-useRef`.

When all three pass, answer `NOTES.md` in this folder.
