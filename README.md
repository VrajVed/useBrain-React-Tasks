# useBrain()

The one hook AI can't call for you.

Learn React hooks by fixing broken mini apps. Each exercise is a small app that does not work yet. You read a short lesson, see the bug with your own eyes, fix the code, and the tests tell you when you got it right.

Made for the DJSCE Compute web dev co-committee.

## Quick start

Already have Node 20+, Git and VS Code? Fork this repo with the **Fork** button (top right), then:

```bash
git clone https://github.com/<your-username>/useBrain-React-Tasks.git
cd useBrain-React-Tasks
npm install
npm run dev                 # terminal 1: the playground, open the link it prints
npm test -- 01-useState     # terminal 2: tests for the exercise you are on
```

Fix `exercises/01-useState/Counter.tsx` until the tests go green, answer `NOTES.md`, commit, push, next exercise.

**Never used Git, GitHub or a terminal before?** That is fine. Skip the box above and follow this page from Part 1, top to bottom, without skipping steps. The first setup takes about 20 minutes, after that it is just coding.

---

## Part 1: Install the tools (once)

You need three things on your laptop.

| Tool | What it is | Get it |
|---|---|---|
| **Node.js** (LTS) | Runs JavaScript outside the browser. Comes with `npm`, which installs packages | https://nodejs.org (click the **LTS** button) |
| **Git** | Saves versions of your code and sends them to GitHub | https://git-scm.com/downloads |
| **VS Code** | The code editor | https://code.visualstudio.com |

Install all three with the default options. Also make a free account on https://github.com if you do not have one.

**Check it worked.** Open a terminal:

- **Windows:** press the Windows key, type `cmd`, press Enter
- **Mac:** press Cmd + Space, type `Terminal`, press Enter
- **Linux:** you know where it is

Type these one by one and press Enter after each:

```bash
node -v
npm -v
git --version
```

Each one should print a version number. `node -v` must say `v20` or higher. If you get "command not found" or "not recognized", close the terminal, open a new one and try again. Still broken? Restart your laptop.

**Tell Git who you are** (once, use the same email as your GitHub account):

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

---

## Part 2: Get your own copy of this project (once)

### 2.1 Fork it

A **fork** is your own copy of this project on GitHub. You work in your copy, and the checker grades your copy.

1. Make sure you are logged in to GitHub.
2. Click the **Fork** button at the top right of this page.
3. Do not change the name. Click **Create fork**.

You are now on `github.com/<your-username>/useBrain-React-Tasks`. That is **your** copy. Keep it **public**, or the checker cannot see your work.

> Use the **Fork** button. Do not download the ZIP and do not use "Use this template". The checker only finds real forks.

### 2.2 Download your fork to your laptop

This is called **cloning**. In the terminal, go to the folder where you keep projects, then clone. Replace `<your-username>` with your GitHub username:

```bash
cd Desktop
git clone https://github.com/<your-username>/useBrain-React-Tasks.git
cd useBrain-React-Tasks
```

Clone **your fork** (your username in the link), not the original.

### 2.3 Install the project's packages

Still in the same terminal, inside the `useBrain-React-Tasks` folder:

```bash
npm install
```

This downloads everything the project needs into a `node_modules` folder. It takes a minute. Warnings are normal, only red `ERR!` lines are a problem.

### 2.4 Open it in VS Code

```bash
code .
```

If `code` is not recognized, open VS Code yourself and use **File > Open Folder** and pick `useBrain-React-Tasks`.

---

## Part 3: Start working

You will keep **two terminals** running while you work. In VS Code, open a terminal with **Terminal > New Terminal**. Click the **+** icon in the terminal panel to open a second one.

**Terminal 1, the playground:**

```bash
npm run dev
```

It prints a link like `http://localhost:5173`. Ctrl + click it (Cmd + click on Mac) to open it in your browser. You will see:

- **Left:** the list of exercises, 01 to 08
- **Middle:** the lesson for the exercise you picked
- **Right:** the live app. It updates by itself every time you save a file

**Terminal 2, the tests:**

```bash
npm test -- 01-useState
```

This checks exercise 01 and keeps watching. Every time you save, it checks again. Change `01-useState` to the exercise you are on (`02-useEffect`, `03-useRef` and so on). Press `q` to stop it.

To stop the playground, click into its terminal and press Ctrl + C.

---

## Part 4: Solve an exercise

Go **in order**, 01 to 08. Each one builds on the one before.

Every exercise lives in its own folder inside `exercises/`, for example `exercises/01-useState/`:

| File | What it is | Touch it? |
|---|---|---|
| `README.md` | The lesson. Same as the middle of the playground | Read it |
| `Counter.tsx` (the component) | The broken app | **Yes, this is what you fix** |
| `Counter.test.tsx` | The tests that check your fix | **No, never** |
| `NOTES.md` | Questions about what you learned | **Yes, answer them** |

The loop for every exercise:

1. **Read** the lesson in the playground.
2. **Play** with the broken app on the right. Find the bug with your own eyes before touching code.
3. **Fix** the component file in VS Code and save (Ctrl + S).
4. **Check** terminal 2.
5. **Answer** `NOTES.md` in your own words. Write your answer under each question.
6. **Submit** (Part 5).

### Reading the test output

When something is still wrong, you see red:

```
 ❯ exercises/01-useState/Counter.test.tsx (4 tests | 3 failed)
   × Counter > increments when + is clicked
     → expect(element).toHaveTextContent()

Expected element to have text content:
  1
Received:
  0
```

Read it like a sentence: *"When + is clicked, the test expected to see `1`, but the screen still showed `0`."* That is your clue.

When you are done, you see green:

```
 ✓ exercises/01-useState/Counter.test.tsx (4 tests)
 Test Files  1 passed (1)
      Tests  4 passed (4)
```

All green means move on to the next one. Some tests also print a hint in plain English next to the failure, so read the whole thing.

---

## Part 5: Submit your work

Submitting = saving a version of your code (**commit**) and sending it to your fork on GitHub (**push**). Do this after every exercise.

### Easiest way: VS Code

1. Click the **Source Control** icon on the left side of VS Code (the one that looks like a branch, or press Ctrl + Shift + G).
2. Type a short message in the box, like `solved 01`.
3. Click **Commit**. If it asks "stage all changes?", click **Yes**.
4. Click **Sync Changes** (or **Publish**).
5. The first time, it asks you to sign in to GitHub in your browser. Allow it.

### Or with the terminal

```bash
git add .
git commit -m "solved 01"
git push
```

### Check it arrived

Open your fork on GitHub. You should see your message next to the files and "1 minute ago" or similar.

That is it. Every hour a checker visits your fork, runs the **original** tests on your code, and updates the committee progress sheet. You do not have to tell anyone, pushing is the submission. It can take up to an hour to show up.

---

## Rules

- **Never edit the test files** (`*.test.tsx`), the `tests/` folder, or `AGENTS.md`. The checker grades you with its own original copy of the tests, so editing them only fools you. `npm run verify-tests` tells you if you touched something by accident.
- **Write `NOTES.md` yourself.** Short is fine. Copied is not.
- **Go in order.**

### About AI

Use AI like a teacher, not like a vending machine. If you cannot explain your fix line by line, you are not done, and you will be asked to.

This project includes an `AGENTS.md` file (plus `CLAUDE.md`, `GEMINI.md` and Copilot instructions). AI coding tools that open this folder, like Copilot, Cursor, Claude Code or Codex, read it and switch into tutor mode: they ask you questions and give hints, but they will not write the fix for you. That is on purpose. Lean into it, it is a better teacher than a copy paste.

---

## Command cheat sheet

Run all of these inside the `useBrain-React-Tasks` folder.

| Command | What it does |
|---|---|
| `npm install` | Installs the project's packages. Once after cloning, and again if `package.json` ever changes |
| `npm run dev` | Starts the playground at `http://localhost:5173`. Stop with Ctrl + C |
| `npm test -- 03-useRef` | Tests one exercise and reruns on every save. Stop with `q` |
| `npm test` | Tests all exercises, reruns on every save |
| `npm run test:run` | Tests everything once and exits |
| `npm run verify-tests` | Checks you did not change any test or protected file by accident |
| `git status` | Shows which files you changed |
| `git add .` then `git commit -m "solved 03"` | Saves a version of your work |
| `git push` | Sends your saved versions to your fork on GitHub |
| `git pull` | Gets the latest version of your fork onto your laptop |

---

## Something broke?

| Problem | Fix |
|---|---|
| `node`, `npm` or `git` "not recognized" / "command not found" | Close and reopen the terminal. If that does not work, restart the laptop. Still broken, reinstall from Part 1 |
| Windows PowerShell says **"running scripts is disabled on this system"** | Use Command Prompt instead (in VS Code: the **v** next to the terminal **+** > Command Prompt). Or run once in PowerShell: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` |
| `npm run dev` says **"Missing script"** or **"ENOENT package.json"** | You are in the wrong folder. Run `cd useBrain-React-Tasks` first. VS Code should have the project folder open, not the folder around it |
| `npm install` shows red `ERR!` lines | Check your internet, then run `npm install` again. College WiFi blocking it? Try mobile hotspot |
| Port 5173 is already in use | Another playground is still running. Close the other terminal, or just use the new link it prints |
| The playground shows **"Your component crashed"** | Your code has an error. Read the red message, fix it, save, then click **Try again** |
| The playground is blank | Look at the terminal running `npm run dev` for red errors, and press F12 in the browser to see the Console |
| Commit fails with **"Please tell me who you are"** | Run the two `git config` lines from Part 1 |
| `git push` asks for a password | GitHub does not accept your account password there. Push from VS Code (Part 5) instead, it signs you in through the browser |
| `git push` says **rejected** | Run `git pull`, then push again |
| A check says **"These files are read only"** | You changed a test or `AGENTS.md`. Put it back with `git checkout -- <that file>` |
| The project got an update from the Web Dev Head | On your fork's GitHub page click **Sync fork > Update branch**, then run `git pull` on your laptop |

Still stuck? Ask in the committee group. Send the **exact error** (copy the text or take a screenshot), which exercise you are on, and what you already tried.

---

## The exercises

| # | Hook | App you fix |
|---|---|---|
| 01 | `useState` | Pizza slice counter |
| 02 | `useEffect` | Joke card |
| 03 | `useRef` | Stopwatch |
| 04 | `useMemo` | Lucky ticket finder |
| 05 | `useCallback` | Gaming lobby friend list |
| 06 | `useReducer` | Pizza builder |
| 07 | `useContext` | Theme without prop drilling |
| 08 | custom hook | `useLocalStorage` |

## License

MIT
