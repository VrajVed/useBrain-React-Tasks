# 05 useCallback

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

## The three parts

Do them in order. Each one is a folder in here with its own task and tests.

1. **a: Friend list, stopping extra re-renders**
2. **b: Cookie clicker, the stale callback**
3. **c: User card, the effect that never stops**

Check one part with `npm test -- 05-useCallback/a` (or `/b`, `/c`). Check all three with `npm test -- 05-useCallback`.

When all three pass, answer `NOTES.md` in this folder.
