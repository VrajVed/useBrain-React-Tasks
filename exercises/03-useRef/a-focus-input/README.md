# 03 a: Focus the search box

When the page opens, the cursor should already be in the search box. The **Focus search** button should put it back there. Neither works.

## Why

`inputRef` is a normal object. It is never connected to the `<input>`, and it is made fresh on every render anyway.

`useRef` gives you a box React keeps between renders. Put it on a tag with `ref={...}` and React fills `ref.current` with the real DOM element, the same thing `document.querySelector` would give you in plain JS.

```jsx
const btnRef = useRef(null)
// ...
<button ref={btnRef}>Click</button>
// later: btnRef.current.style.backgroundColor = 'red'
```

## Your task

Fix `SearchBox.tsx` with `useRef`. Do not use `document.querySelector` or `getElementById`. In React you ask for the element with a ref.

## Check

```bash
npm test -- 03-useRef/a
```
