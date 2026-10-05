# Exercise 8: Custom Hook - useLocalStorage

## What it does

A custom hook lets you extract reusable logic. `useLocalStorage` syncs a state value with `localStorage` so it survives page reloads.

## Where it is used

- Saving user preferences
- Draft forms
- Theme or language choice

## Fun example

A dark mode toggle that remembers your choice even after you close the tab.

```jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initial
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

## Your task

Open `ThemeToggle.tsx`. It uses `useState` for theme, so the choice is lost on reload. Create a `useLocalStorage` hook in `useLocalStorage.ts` and use it in the component.

## Rules

- Do not edit `ThemeToggle.test.tsx`.
- Write your hook in `useLocalStorage.ts`.
