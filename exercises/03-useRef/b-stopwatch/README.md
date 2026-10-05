# 03 b: Stopwatch

## Your task

Open `Stopwatch.tsx`. Run `npm run dev`, pick 03 b, press Start, then Stop. It does not stop. Press Start again and it speeds up.

The bug: `let intervalId` is a normal variable, so it is created fresh (as `null`) on every render. By the time you press Stop, the ID of the running interval is gone.

Fix it:

1. Keep the interval ID in a `useRef`, so Stop can clear the right interval.
2. Clear the interval if the stopwatch disappears (unmounts). Think about which hook gives you a cleanup function.

## Check

```bash
npm test -- 03-useRef/b
```

## Rules

- Do not edit `Stopwatch.test.tsx`.
- Use `useRef` for the interval ID.
