# 05 b: Stale callback

Bake a few cookies, then click **Log my score** and check the Console. It logs `0`, every time.

## Why

`useCallback(fn, [])` keeps the **first** version of the function forever. That first version was made during the first render, when `cookies` was `0`, and it remembers that `0`. It is the same snapshot problem as 03 c, just hidden inside `useCallback`.

`useCallback` has a dependency array for the same reason `useEffect` and `useMemo` do: every value from the component that the function reads must be listed, or the function goes stale.

## Your task

Fix `CookieClicker.tsx` so it logs the real score. Keep `useCallback`.

## Check

```bash
npm test -- 05-useCallback/b
```
