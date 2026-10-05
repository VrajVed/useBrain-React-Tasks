# 04 a: Lucky ticket

## Your task

Open `MagicFinder.tsx`. Run `npm run dev`, pick 04 a, and click Toggle mode a few times. It feels laggy, because `findMagic` is slow and runs on **every** render, even though only the colour changed. Open the DevTools **Console** and watch it print every time.

Wrap it in `useMemo` so it only runs when `tickets` or `findMagic` change. After your fix, toggling should feel instant and the console should stay quiet.

## Check

```bash
npm test -- 04-useMemo/a
```

## Rules

- Do not edit `MagicFinder.test.tsx`.
- Use `useMemo` with the correct dependency array.
