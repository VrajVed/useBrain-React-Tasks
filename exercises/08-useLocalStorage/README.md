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

Open `ThemeToggle.tsx`. Run `npm run dev`, pick exercise 08, switch to dark and refresh the page. It forgets.

1. Write `useLocalStorage(key, initialValue)` in `useLocalStorage.ts`. It works like `useState` (returns `[value, setValue]`) but also saves to `localStorage` as JSON, and reads the saved value when it starts.
2. Use it in `ThemeToggle.tsx` with the key `"theme"`.

The tests check your hook on its own first, then the component.

## Check your work

```bash
npm test -- 08-useLocalStorage
```

## Rules

- Do not edit `ThemeToggle.test.tsx`.
- Write your hook in `useLocalStorage.ts`.
