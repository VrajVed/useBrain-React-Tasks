# 02 a: The dependency array

This is the part of `useEffect` that decides **when** it runs.

| You write | It runs |
|---|---|
| `useEffect(fn)` | after **every** render |
| `useEffect(fn, [])` | **once**, after the first render |
| `useEffect(fn, [name])` | after the first render, and again **every time `name` changes** |

Think of the array as: "only rerun me if one of these changed since last time".

## Your task

Open the playground and the **Console** (F12). Type a name and watch:

1. The console prints `Greeting appeared` on **every key you press**. It should print once.
2. The browser tab title never changes from "Hi, stranger".

Both bugs are just the wrong dependency array. Fix `Greeting.tsx`.

## Check

```bash
npm test -- 02-useEffect/a
```
