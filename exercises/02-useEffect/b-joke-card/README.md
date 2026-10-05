# 02 b: Joke card

## Your task

Open `JokeCard.tsx`. Run `npm run dev`, pick 02 b, and open DevTools (F12) on the **Network** tab. Watch the requests pile up.

The bugs:

1. `fetch` is called straight inside the component. Every render fetches, and every fetch causes another render.
2. Nothing cancels the request if the card disappears.

Fix it so the joke is fetched **once**, and the request is **cancelled in the cleanup function**.

> Side note: real React apps usually wrap everything in `<StrictMode>`, which runs effects twice in development on purpose to catch missing cleanups. This playground turns it off so what you see matches the tests.

## Check

```bash
npm test -- 02-useEffect/b
```

## Rules

- Do not edit `JokeCard.test.tsx`.
- Answer the questions in `NOTES.md` in your own words.
