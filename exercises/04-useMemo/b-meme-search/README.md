# 04 b: Meme search

Someone already added `useMemo` here to make search fast. Now search does not work at all: type `cat` and every meme is still listed.

## Why

`useMemo(fn, [])` with an empty array means "work this out once and **never again**". The list was filtered with an empty search on the first render, and that result is reused forever.

The dependency array has to list **everything the calculation reads** that can change. If you leave something out, you get an old answer. That is called a **stale** value, and it is the most common `useMemo` bug.

## Your task

Fix the dependency array in `MemeSearch.tsx` so:

- typing filters the list
- toggling dark mode does **not** filter again (watch the Console)

## Check

```bash
npm test -- 04-useMemo/b
```
