# Exercise 7: useContext

## What it does

`useContext` lets any component read a value straight from a Provider higher up the tree, without that value being passed down as a prop through every component in between.

From the Web Dev Head's notes: say a value lives in `App.jsx` but has to be shown in `Button.jsx`.

```
App.jsx
  Navbar.jsx
    Login.jsx
      Button.jsx
```

Without context you pass a prop into Navbar, then into Login, then into Button, even though Navbar and Login never use it. That is called **prop drilling**. Context fixes it.

## The three steps

```jsx
// 1. Create it (usually in its own file, like context/context.js)
export const counterContext = createContext(0)

// 2. Provide it, high up in the tree
<counterContext.Provider value={count}>
  <Navbar />
</counterContext.Provider>

// 3. Read it, anywhere below
const count = useContext(counterContext)
```

You can pass objects too: `value={{ count, setCount }}`.

## Where it is used

- Light / dark theme
- The logged in user
- Language of the site

## Your task

Open `ThemeApp.tsx`. The theme is drilled from `ThemeApp` to `Layout` to `Card`. `Layout` does nothing with it except pass it on.

Create a `ThemeContext`, provide the theme in `ThemeApp`, and read it in `Card` with `useContext`. `Layout` and `Card` should not take a `theme` prop anymore.

## Check your work

```bash
npm test -- 07-useContext
```

## Rules

- Do not edit `ThemeApp.test.tsx`.
- Create and use a `ThemeContext`.
