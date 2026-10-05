# Exercise 5: useCallback

## What it does

`useCallback` remembers a function reference so a child component wrapped in `React.memo` does not re-render when the parent re-renders for unrelated reasons.

## Where it is used

- Passing callbacks to memoized child components
- Stable event handlers in large lists
- Optimizing renders without breaking referential equality

## Fun example

A gaming lobby friend list. You have dozens of friends. Removing one friend should not cause every other friend card to re-render.

```jsx
import { useState, useCallback } from 'react'

function FriendList({ friends }) {
  const [list, setList] = useState(friends)
  const remove = useCallback((id) => {
    setList(prev => prev.filter(f => f.id !== id))
  }, [])

  return list.map(f => <FriendItem key={f.id} friend={f} onRemove={remove} />)
}
```

## Your task

Open `FriendList.tsx`. The `removeFriend` function is recreated on every render, so `FriendItem` re-renders even when it should not. Use `useCallback` to keep the function reference stable.

## Check your work

```bash
npm test -- 05-useCallback
```

## Rules

- Do not edit `FriendList.test.tsx`.
- Use `useCallback` for `removeFriend`.
