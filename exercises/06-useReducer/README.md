# Exercise 6: useReducer

## What it does

`useReducer` is like `useState` for complex state. You dispatch actions and a reducer function decides how state changes.

## Where it is used

- Forms with many fields
- Shopping carts
- State machines with clear next states

## Fun example

A pizza builder. You pick toppings and the reducer calculates the total price.

```jsx
import { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'add_topping':
      return { ...state, toppings: [...state.toppings, action.payload] }
    case 'remove_topping':
      return { ...state, toppings: state.toppings.filter(t => t !== action.payload) }
    default:
      return state
  }
}
```

## Your task

Open `PizzaBuilder.tsx`. It uses multiple `useState` calls and the price calculation is scattered. Replace it with `useReducer`.

## Rules

- Do not edit `PizzaBuilder.test.tsx`.
- Use `useReducer` for state and actions.
