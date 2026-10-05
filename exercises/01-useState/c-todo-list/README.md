# 01 c: Todo list

Type a todo and press **Add**. Nothing shows up. Click a todo to mark it done. Nothing happens either.

## Why

React decides whether to re-render by checking if you gave it a **different** value. `todos.push(...)` changes the old array in place, then `setTodos(todos)` hands React the **same** array back. React sees nothing new, so it does nothing.

With arrays and objects in state, never change them. Make a new one:

| Instead of | Do |
|---|---|
| `list.push(item)` | `[...list, item]` |
| `item.done = true` | `{ ...item, done: true }` |
| changing one item in a list | `list.map(x => x.id === id ? { ...x, done: true } : x)` |
| removing an item | `list.filter(x => x.id !== id)` |

## Your task

Fix `add` and `toggle` in `TodoList.tsx`. The tests also check you never change the original array or objects.

## Check

```bash
npm test -- 01-useState/c
```
