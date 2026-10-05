# 06 a: Pizza builder

## Your task

Open `PizzaBuilder.tsx`. It works, but the logic for changing toppings is spread across loose functions. Move all of it into one `reducer` function and use `useReducer`. The pizza should behave exactly the same, this is a refactor.

The tests check the behaviour **and** that you really used `useReducer`.

## Check

```bash
npm test -- 06-useReducer/a
```

## Rules

- Do not edit `PizzaBuilder.test.tsx`.
- Use `useReducer` for state and actions. No `useState` left in the file.
