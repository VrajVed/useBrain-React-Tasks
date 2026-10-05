# 05 a: Friend list

## Your task

Open `FriendList.tsx`. The `removeFriend` function is recreated on every render, so `FriendItem` re-renders even when it should not. Use `useCallback` to keep the function reference stable.

## Check

```bash
npm test -- 05-useCallback/a
```

## Rules

- Do not edit `FriendList.test.tsx`.
- Use `useCallback` for `removeFriend`.
