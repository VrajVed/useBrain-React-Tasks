# 06 b: Canteen cart

The cart uses `useReducer` already, and `Cart.tsx` is fine. The bugs are all in `cartReducer.ts`. Click **+** in the playground: nothing changes. And **-** would happily order `-3` samosas.

## Why

A reducer must be a **pure function**:

- It gets the old state and an action, and **returns a new state**.
- It never changes the old state. Same rule as 01 c: React only re-renders if it gets a **different** object back.
- Same input, same output. No fetching, no random numbers, no timers in here.

Because it is just a function, you can test it without any React at all. That is exactly what most of the tests here do.

## Your task

Fix `increment` and `decrement` in `cartReducer.ts`:

1. Return new objects instead of changing the old ones (look at how `clear` already does it).
2. Quantity never goes below 0.

## Check

```bash
npm test -- 06-useReducer/b
```
