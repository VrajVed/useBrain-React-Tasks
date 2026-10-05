# 08 Custom hooks

## What it is

A **custom hook** is a normal function that:

1. has a name starting with `use`
2. calls other hooks inside (`useState`, `useEffect`, ...)

That is it. No special API. It lets you pull logic out of a component and reuse it in many components, the same way a normal function lets you reuse code.

```jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return width
}

// any component can now do:
const width = useWindowWidth()
```

Each component that calls a custom hook gets its **own** copy of the state inside it. Two components calling `useToggle()` do not share one toggle.

## Rules of hooks

These apply to every hook, custom or not:

- Only call hooks at the **top level** of a component or another hook. Not inside `if`, loops, or after an early `return`.
- Only call hooks from React components or other hooks, not from normal functions.

React keeps track of hooks by the **order** they are called in. Break the order and it mixes up which state belongs to which hook.

## Where it is used

- `useLocalStorage`, `useDebounce`, `useFetch`, `useWindowWidth`, `useOnlineStatus`
- Almost every big React app has a `hooks/` folder full of these

## The three parts

Do them in order. Each one is a folder in here with its own task and tests.

1. **a: useToggle, your first custom hook**
2. **b: useLocalStorage, state that survives a refresh**
3. **c: useDebounce, waiting until they stop typing**

Check one part with `npm test -- 08-custom-hooks/a` (or `/b`, `/c`). Check all three with `npm test -- 08-custom-hooks`.

When all three pass, answer `NOTES.md` in this folder.
