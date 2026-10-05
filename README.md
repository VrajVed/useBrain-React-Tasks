# Hookslings

Learn React hooks by fixing broken components. Each exercise is a small app that does not work yet. Read the lesson, fix the component, make the tests pass.

Made for the DJSCE Compute web dev co-committee.

## Setup (once)

1. Click **Fork** at the top of this page. Keep the fork **public** and keep the name.
2. Clone **your fork**, not this repo:
   ```bash
   git clone https://github.com/<your-username>/Compute-React-Task.git
   cd Compute-React-Task
   npm install
   ```
3. Open two terminals:
   ```bash
   npm run dev     # the playground: lesson on the left, your component live on the right
   npm test        # the tests, they rerun every time you save
   ```

You need Node 20 or newer (`node -v`).

## How to work

Go **in order**, 01 to 08. Each one builds on the one before.

For every exercise in `exercises/`:

1. Read `README.md` (also shown in the playground).
2. Look at the broken component in the playground. See what is wrong with your own eyes.
3. Fix the component file.
4. Run just that exercise: `npm test -- 01-useState`
5. Answer `NOTES.md` in your own words. Some questions need you to look at the screen.
6. Commit and push to `main`.

```bash
git add .
git commit -m "solved 01"
git push
```

## Progress

Every hour a checker looks at your fork, runs the **original** tests against your code, and updates the committee progress sheet. Pushing is how you submit.

Want a green tick on your own commits too? Open the **Actions** tab in your fork and enable workflows.

## Rules

- **Do not edit test files** (`*.test.tsx`) or anything in `tests/`. The checker uses its own copy anyway, so editing them only fools you.
- Write `NOTES.md` yourself. Short is fine, copied is not.
- AI tools: use them like a teacher, not like a vending machine. If you cannot explain your fix line by line, you have not finished.

## Exercises

| # | Hook | App |
|---|---|---|
| 01 | `useState` | Pizza slice counter |
| 02 | `useEffect` | Joke card |
| 03 | `useRef` | Stopwatch |
| 04 | `useMemo` | Lucky ticket finder |
| 05 | `useCallback` | Gaming lobby friend list |
| 06 | `useReducer` | Pizza builder |
| 07 | `useContext` | Theme without prop drilling |
| 08 | custom hook | `useLocalStorage` |

## Stuck?

- Read the error in the terminal from the top. The first red line is usually the real one.
- Tests print a hint next to some failures, read it.
- Ask in the committee group, with the exact error.
