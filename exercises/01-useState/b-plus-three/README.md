# 01 b: Slice party

Three friends walk in and each grab a slice. The **+3** button calls `addOne()` three times. Click it in the playground. It only adds **one**.

## Why

`slices` is a snapshot. Inside one click, it is the same number in all three calls, so you are telling React "set it to 0 + 1" three times in a row.

The setter also accepts a **function**. React calls it with the newest value, one after another:

```jsx
setScore(previous => previous + 10)
```

## Your task

Fix `addOne` in `SliceParty.tsx` so three calls add three slices. Leave `threeFriends` exactly as it is.

## Check

```bash
npm test -- 01-useState/b
```
