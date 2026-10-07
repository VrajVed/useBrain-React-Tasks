# useBrain()

The one hook AI can't call for you.

Learn React hooks by fixing broken mini apps. Each exercise is a small app that does not work yet. You read a short lesson, see the bug with your own eyes, fix the code, and the tests tell you when you got it right.

**You work with two windows side by side:** VS Code where you fix the code, and a playground in your browser (`npm run dev`) with the lesson and your live app. Every time you save in VS Code, the app in the browser updates on its own. See the bug, fix it, watch it work. Setup is below.

Made for the DJSCE Compute web dev co-committee.

## How your progress is tracked

Your progress is tracked automatically on a **Google Sheet** that the Web Dev Head checks. You do not fill anything in, and you do not need to tell anyone you finished. **Pushing your code to your fork is your submission.**

Every hour, a checker:

1. finds every fork of this repo, including yours
2. takes your latest pushed code
3. runs the **original** tests on it (not the copy in your fork, so changing tests does nothing)
4. updates your row on the sheet

The sheet shows, for every member:

| Column | What it means |
|---|---|
| **01-useState ... 08-custom-hooks** | ✅ when **all three** parts (a, b, c) of that hook pass. Two out of three still shows empty |
| **Done** | how many of the 8 hooks you have finished |
| **Notes** | how many `NOTES.md` files you actually answered |
| **Commit** and **Checked at** | your latest pushed code and when the checker last looked at it |

There is also a log of **when** each hook was first finished, so steady progress shows up, and so does doing everything the night before.

Things that keep you off the sheet:

- you made your copy some other way than the **Fork** button (downloaded the ZIP, used "Use this template", or uploaded the files to a new repo). The checker only finds real forks
- you did not **push**. Code that only lives on your laptop does not count
- you pushed less than an hour ago. Wait for the next check

## Quick start

Already have Node 20+, Git and VS Code? Fork this repo with the **Fork** button (top right), then:

```bash
git clone https://github.com/<your-username>/useBrain-React-Tasks.git
cd useBrain-React-Tasks
npm install
npm run dev                 # terminal 1: the playground, open the link it prints
npm test -- 01-useState/a   # terminal 2: tests for the part you are on
```

Fix `exercises/01-useState/a-slice-counter/Counter.tsx` until the tests go green, then parts `b` and `c`, answer `NOTES.md`, commit, push, next hook.

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

- **Left:** the 8 hooks, each with 3 parts: `a`, `b`, `c`
- **Middle:** two tabs. **Task** is what to fix in this part. **Lesson** explains the hook. Read the Lesson first whenever you start a new hook
- **Right:** the live app. It updates by itself every time you save a file

Drag the edge of the parts list to make it wider or narrower (double click it to reset). Click the `npm test` command above the live app to copy it.

**Terminal 2, the tests:**

```bash
npm test -- 01-useState/a
```

This checks part `a` of hook 01 and keeps watching. Every time you save, it checks again. Change it to the part you are on: `01-useState/b`, `02-useEffect/a` and so on. Leave out the letter (`npm test -- 01-useState`) to check all three parts of a hook. Press `q` to stop it.

To stop the playground, click into its terminal and press Ctrl + C.

### Put them side by side

This is how you will work the whole time: **VS Code on one half of the screen, the browser on the other.**

```
┌─────────────────────────┬─────────────────────────┐
│ VS Code                 │ Browser (playground)    │
│                         │                         │
│  the file you fix       │  Task / Lesson          │
│                         │  your live app          │
│ ─────────────────────── │                         │
│  terminals: dev + tests │                         │
└─────────────────────────┴─────────────────────────┘
```

- **Windows:** click the VS Code window, press **Windows key + Left arrow**. Click the browser, press **Windows key + Right arrow**.
- **Mac:** hover over the green button at the top left of the VS Code window and pick the option that puts it on the **left half**. Then pick the browser for the right half.
- **Linux:** most desktops snap with **Super + Left / Right arrow**.

At half width the playground switches to a narrow layout: part buttons on top, **your live app right under them**, and the task and lesson below. You see the result of every save without scrolling.

Then the loop is: read the task, find the file in VS Code on the left (the task tells you which), edit, save with **Ctrl + S** (Cmd + S on Mac), and look right. The app updates and terminal 2 reruns the tests.

Small screen? Keep VS Code full screen and switch to the browser with **Alt + Tab** (Cmd + Tab on Mac) after each save.

---

## Part 4: Solve an exercise

There are **8 hooks**, and each hook has **3 parts**: `a`, `b` and `c`. That is 24 small exercises. Go **in order**: 01 a, 01 b, 01 c, then 02 a, and so on. Each part builds on the one before.

Each hook has its own folder in `exercises/`, and each part has its own folder inside it:

```
exercises/01-useState/
  README.md            the lesson for useState (the Lesson tab)
  NOTES.md             questions about all three parts, you answer these
  a-slice-counter/
    README.md          what to fix in this part (the Task tab)
    Counter.tsx        the broken app: fix this
    Counter.test.tsx   the tests: never touch this
  b-plus-three/
  c-todo-list/
```

| File | What it is | Touch it? |
|---|---|---|
| `README.md` | The lesson (in the hook folder) or the task (in a part folder) | Read it |
| `Counter.tsx`, `SliceParty.tsx` ... | The broken app | **Yes, this is what you fix** |
| `*.test.tsx` | The tests that check your fix | **No, never** |
| `NOTES.md` | Questions about the hook | **Yes, answer them** |

The loop for every part:

1. **Read** the Task tab (and the Lesson tab when you start a new hook).
2. **Play** with the broken app on the right. Find the bug with your own eyes before touching code. Many parts also print to the browser **Console** (F12).
3. **Fix** the file the task tells you to fix, and save (Ctrl + S).
4. **Check** terminal 2.
5. **Submit** (Part 5). You can push after every part, you do not have to wait for the whole hook.

When all three parts of a hook pass, answer that hook's `NOTES.md` in your own words, under each question.

### Reading the test output

When something is still wrong, you see red:

```
 ❯ exercises/01-useState/a-slice-counter/Counter.test.tsx (4 tests | 3 failed)
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
 ✓ exercises/01-useState/a-slice-counter/Counter.test.tsx (4 tests)
 Test Files  1 passed (1)
      Tests  4 passed (4)
```

All green means move on to the next part. Some tests also print a hint in plain English next to the failure, so read the whole thing.

---

## Part 5: Submit your work

Submitting = saving a version of your code (**commit**) and sending it to your fork on GitHub (**push**). Do this after every exercise.

### Easiest way: VS Code

1. Click the **Source Control** icon on the left side of VS Code (the one that looks like a branch, or press Ctrl + Shift + G).
2. Type a short message in the box, like `solved 01 a`.
3. Click **Commit**. If it asks "stage all changes?", click **Yes**.
4. Click **Sync Changes** (or **Publish**).
5. The first time, it asks you to sign in to GitHub in your browser. Allow it.

### Or with the terminal

```bash
git add .
git commit -m "solved 01 a"
git push
```

### Check it arrived

Open your fork on GitHub. You should see your message next to the files and "1 minute ago" or similar.

That is it. Every hour the checker visits your fork and updates the progress sheet (see [How your progress is tracked](#how-your-progress-is-tracked)). It can take up to an hour to show up.

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
| `npm test -- 03-useRef/b` | Tests one part and reruns on every save. Stop with `q` |
| `npm test -- 03-useRef` | Tests all three parts of one hook |
| `npm test` | Tests everything, reruns on every save |
| `npm run test:run` | Tests everything once and exits |
| `npm run verify-tests` | Checks you did not change any test or protected file by accident |
| `git status` | Shows which files you changed |
| `git add .` then `git commit -m "solved 03 b"` | Saves a version of your work |
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

| # | Hook | a | b | c |
|---|---|---|---|---|
| 01 | `useState` | Slice counter | Slice party (updater function) | Todo list (new arrays and objects) |
| 02 | `useEffect` | Greeting (dependency array) | Joke card (fetch and cancel) | Slide show (cleaning up listeners) |
| 03 | `useRef` | Search box (DOM refs) | Stopwatch (timer ids) | Send later (latest value) |
| 04 | `useMemo` | Lucky ticket (slow calculation) | Meme search (stale dependencies) | Dashboard (same object) |
| 05 | `useCallback` | Friend list (extra re-renders) | Cookie clicker (stale callback) | User card (effect loop) |
| 06 | `useReducer` | Pizza builder (refactor) | Canteen cart (pure reducer) | Login form (one status) |
| 07 | `useContext` | Theme (prop drilling) | Auth (functions in context) | useAuth (hook + helpful error) |
| 08 | custom hooks | useToggle | useLocalStorage | useDebounce |

## License

MIT
