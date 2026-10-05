# 04 c: Stable config

`Chart` is wrapped in `memo`, which means "only re-render me if my props changed". Click **Like** a few times and watch its render count go up anyway.

## Why

`memo` compares props with `===`. Two objects are only `===` if they are the **same object**, not just objects that look the same:

```js
{ color: 'purple' } === { color: 'purple' }   // false, two different objects
```

`const config = { color, size: 24 }` makes a brand new object on every render of `Dashboard`. So every like hands `Chart` a "new" config, and `memo` lets it re-render.

`useMemo` can hand back the **same object** until something it depends on actually changes.

## Your task

Make `config` stay the same object between renders, unless `color` changes. Do not touch `Chart`.

## Check

```bash
npm test -- 04-useMemo/c
```
