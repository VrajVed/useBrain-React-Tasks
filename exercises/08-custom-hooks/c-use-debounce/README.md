# 08 c: useDebounce

Type `react` into the search box with the Console open. It searches for `r`, `re`, `rea`, `reac` and `react`. Five requests for one search. On a real API that is slow and costs money.

**Debouncing** means: wait until the user stops typing for a moment, then search once.

## Your task

Write `useDebounce(value, delay)` in `useDebounce.ts`. `LiveSearch.tsx` already uses it, do not change that file.

It should give back the **old** value until `value` has stayed the same for `delay` milliseconds, then switch to the new one.

This hook combines everything so far:

- `useState` to hold the value you hand back
- `useEffect` that starts a timer whenever `value` changes
- a **cleanup** that cancels the previous timer, so typing again starts the wait over

## Check

```bash
npm test -- 08-custom-hooks/c
```
