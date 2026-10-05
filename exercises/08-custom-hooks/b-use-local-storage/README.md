# 08 b: useLocalStorage

`localStorage` is a small key/value store in the browser that survives page refreshes. It only stores **strings**, so objects and booleans go in with `JSON.stringify` and come out with `JSON.parse`.

```js
localStorage.setItem('score', JSON.stringify(42))
JSON.parse(localStorage.getItem('score'))   // 42
localStorage.getItem('nothing-here')        // null
```

## Your task

Open `ThemeToggle.tsx`. Run `npm run dev`, pick 08 b, switch to dark and refresh the page. It forgets.

1. Write `useLocalStorage(key, initialValue)` in `useLocalStorage.ts`. It works like `useState` (returns `[value, setValue]`) but also saves to `localStorage` as JSON, and reads the saved value when it starts.
2. Use it in `ThemeToggle.tsx` with the key `"theme"`.

The tests check your hook on its own first, then the component.

## Check

```bash
npm test -- 08-custom-hooks/b
```

## Rules

- Do not edit `ThemeToggle.test.tsx`.
- Write your hook in `useLocalStorage.ts`.
