# 05 c: The effect that never stops

Open the playground with the Console open. `fetching user 1` prints again and again, forever.

## Why

Follow the loop:

1. `load` is a new function on every render.
2. The effect depends on `[load]`. New function, so the effect runs again.
3. The effect fetches, then `setUser` causes a render.
4. Back to step 1.

The dependency array is right, `load` really is used in the effect. The problem is that `load` is never the **same** function twice. `useCallback` keeps it the same until something it uses actually changes.

`load` cannot just move inside the effect, because the **Refresh** button needs it too.

## Your task

Wrap `load` in `useCallback` with the right dependencies, so it loads once, and again only when `userId` changes.

## Check

```bash
npm test -- 05-useCallback/c
```
