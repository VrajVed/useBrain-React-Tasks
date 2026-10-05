# 06 useReducer

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

## The three parts

Do them in order. Each one is a folder in here with its own task and tests.

1. **a: Pizza builder, from useState to useReducer**
2. **b: Canteen cart, pure reducers**
3. **c: Login form, one status instead of many booleans**

Check one part with `npm test -- 06-useReducer/a` (or `/b`, `/c`). Check all three with `npm test -- 06-useReducer`.

When all three pass, answer `NOTES.md` in this folder.
