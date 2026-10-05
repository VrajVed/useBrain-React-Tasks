# 02 c: Keyboard shortcut

Click somewhere on the page, then press the **right arrow** a few times. The first press moves one slide. Then it starts skipping: two, then four...

## Why

`window.addEventListener` is not React. React does not know about it and will never remove it for you.

This effect has no dependency array, so it runs after every render. Every key press re-renders, and every render adds **another** listener on top of the old ones. Five listeners means one key press moves five times.

## Your task

Fix `SlideShow.tsx`:

1. Add the listener only once.
2. Return a **cleanup function** that removes it with `window.removeEventListener('keydown', onKey)`. It must be the same `onKey` function you added.

## Check

```bash
npm test -- 02-useEffect/c
```
