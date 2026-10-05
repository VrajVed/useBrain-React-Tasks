# 07 a: Theme without prop drilling

## Your task

Open `ThemeApp.tsx`. The theme is drilled from `ThemeApp` to `Layout` to `Card`. `Layout` does nothing with it except pass it on.

Create a `ThemeContext`, provide the theme in `ThemeApp`, and read it in `Card` with `useContext`. `Layout` and `Card` should not take a `theme` prop anymore.

## Check

```bash
npm test -- 07-useContext/a
```

## Rules

- Do not edit `ThemeApp.test.tsx`.
- Create and use a `ThemeContext`.
