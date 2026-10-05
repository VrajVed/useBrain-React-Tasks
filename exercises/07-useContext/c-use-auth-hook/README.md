# 07 c: A useAuth hook

Real apps rarely call `useContext(AuthContext)` everywhere. They wrap it in a small custom hook, `useAuth()`, so components do not even need to know the context exists.

The playground shows `Profile` twice: once inside `<AuthProvider>`, and once where someone **forgot** the provider. The second one crashes with:

```
Cannot destructure property 'user' of 'useAuth(...)' as it is null.
```

That message does not tell the next developer what they did wrong.

## Your task

In `auth.tsx`, make `useAuth()` check what `useContext` gave back. If there is no provider, throw an error with exactly this message:

```
useAuth must be used inside <AuthProvider>
```

Remove the `as Auth` lie while you are at it. TypeScript should be able to see that the value is never `null` after your check.

## Check

```bash
npm test -- 07-useContext/c
```
