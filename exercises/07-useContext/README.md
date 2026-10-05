# Exercise 7: useContext

## What it does

`useContext` lets a component read a value from a provider without props being passed down through every level.

## Where it is used

- Theme switching
- Authentication state
- Language / locale

## Fun example

A dark mode toggle nested deep inside the app. Without context you would have to thread the theme through every component.

```jsx
const ThemeContext = createContext('light')

function DeepCard() {
  const theme = useContext(ThemeContext)
  return <div className={theme}>I adapt automatically</div>
}
```

## Your task

Open `ThemeApp.tsx`. The theme is passed through props from `App` to `Layout` to `Card`. Replace prop drilling with `useContext`.

## Rules

- Do not edit `ThemeApp.test.tsx`.
- Create and use a `ThemeContext`.
