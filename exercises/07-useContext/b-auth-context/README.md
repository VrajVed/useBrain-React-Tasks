# 07 b: Auth context

This is the exact tree from the lesson:

```
AuthApp
  Navbar     uses user
    Login    uses nothing, just passes it all down
      Button uses user, onLogin, onLogout
```

`Login` takes three props it never uses, only to hand them to `Button`. Add one more feature and every component in between needs another prop.

Context can hold **functions** too, not just values. Put everything in one object:

```jsx
<AuthContext.Provider value={{ user, login, logout }}>
```

and any component below can grab only what it needs with `useContext(AuthContext)`.

## Your task

Create an `AuthContext`, provide `{ user, login, logout }` from `AuthApp`, and read it in `Navbar` and `Button`. No component should take `user`, `onLogin` or `onLogout` as props anymore. It should still work the same.

## Check

```bash
npm test -- 07-useContext/b
```
