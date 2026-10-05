# 02 useEffect

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

## The three parts

Do them in order. Each one is a folder in here with its own task and tests.

1. **a: Greeting, the dependency array**
2. **b: Joke card, fetching and cancelling**
3. **c: Slide show, cleaning up event listeners**

Check one part with `npm test -- 02-useEffect/a` (or `/b`, `/c`). Check all three with `npm test -- 02-useEffect`.

When all three pass, answer `NOTES.md` in this folder.
