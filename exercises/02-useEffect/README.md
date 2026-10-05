# Exercise 2: useEffect

## What it does

`useEffect` runs code **after** React has put your component on the screen. That code is called a side effect: anything that reaches outside the component, like fetching data, starting a timer or changing the page title.

```jsx
useEffect(() => {
  // runs after the component shows up on screen

  return () => {
    // cleanup: runs when the component goes away (unmounts)
  }
}, [/* dependencies: anything in here can make the effect run again */])
```

| Dependency array | When the effect runs |
|---|---|
| left out | after every single render |
| `[]` | once, after the first render |
| `[userId]` | after the first render, and again whenever `userId` changes |

## Where it is used

- Fetching data from an API
- Timers and intervals
- Event listeners like `keydown` or `resize`
- Syncing with the browser, like `document.title`

## Fun example

Change the tab title to show unread messages, and put it back when the component leaves.

```jsx
function Inbox({ unread }) {
  useEffect(() => {
    document.title = `(${unread}) Inbox`
    return () => {
      document.title = 'My App'
    }
  }, [unread])

  return <p>You have {unread} unread messages</p>
}
```

## Cancelling a fetch

A request can take a while. If the user leaves before it finishes, you should cancel it. The browser gives you `AbortController` for that:

```js
const controller = new AbortController()
fetch(url, { signal: controller.signal })   // this request is now cancellable
controller.abort()                           // cancel it
```

A cancelled fetch fails on purpose, so add a `.catch(() => {})` at the end of the chain.

## Your task

Open `JokeCard.tsx`. Run `npm run dev`, pick exercise 02, and open DevTools (F12) on the **Network** tab. Watch the requests pile up.

The bugs:

1. `fetch` is called straight inside the component. Every render fetches, and every fetch causes another render.
2. Nothing cancels the request if the card disappears.

Fix it so the joke is fetched **once**, and the request is **cancelled in the cleanup function**.

> Side note: real React apps usually wrap everything in `<StrictMode>`, which runs effects twice in development on purpose to catch missing cleanups. This playground turns it off so what you see matches the tests.

## Check your work

```bash
npm test -- 02-useEffect
```

## Rules

- Do not edit `JokeCard.test.tsx`.
- Answer the questions in `NOTES.md` in your own words.
