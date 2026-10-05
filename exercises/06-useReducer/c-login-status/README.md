# 06 c: Login status

In the playground the password is `hooks`. Log in with a wrong password, then try again with the right one. The red error **stays on screen** while it is loading, and even next to "Welcome back!".

## Why

Three separate `useState` booleans can be in combinations that make no sense: loading **and** error, error **and** success. Nothing stops it, so every handler has to remember to reset the others, and this one forgot.

A login form is really in **one** of four states at a time:

```
idle  ──submit──▶  loading  ──fail──▶  error  ──submit──▶  loading ...
                      └──succeed──▶  success
```

`useReducer` lets you write that down once. Each action moves the form to exactly one state, so impossible combinations cannot happen.

## Your task

Replace the `loading`, `error` and `success` states with one `useReducer`. The status can be `idle`, `loading`, `error` (with a message) or `success`. Keep `email` and `password` as `useState`, those are fine.

## Check

```bash
npm test -- 06-useReducer/c
```
