# 08 a: useToggle

`LightSwitch` and `Spoiler` both work. They also both contain the **same two lines**:

```jsx
const [on, setOn] = useState(false)
const toggle = () => setOn(o => !o)
```

A custom hook is just a function whose name starts with `use` and that calls other hooks. It lets you write those lines once and reuse them anywhere.

## Your task

1. Write `useToggle(initial = false)` in `useToggle.ts`. It returns `[value, toggle]`.
2. Use it in both `LightSwitch.tsx` and `Spoiler.tsx`, so neither of them has its own `useState` anymore.

## Check

```bash
npm test -- 08-custom-hooks/a
```
