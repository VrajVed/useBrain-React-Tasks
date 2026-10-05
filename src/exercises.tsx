import { useState, type ReactNode } from 'react'
import ErrorBoundary from './ErrorBoundary'

import Counter from '../exercises/01-useState/a-slice-counter/Counter'
import SliceParty from '../exercises/01-useState/b-plus-three/SliceParty'
import TodoList from '../exercises/01-useState/c-todo-list/TodoList'
import Greeting from '../exercises/02-useEffect/a-dependency-array/Greeting'
import JokeCard from '../exercises/02-useEffect/b-joke-card/JokeCard'
import SlideShow from '../exercises/02-useEffect/c-keyboard-shortcut/SlideShow'
import SearchBox from '../exercises/03-useRef/a-focus-input/SearchBox'
import Stopwatch from '../exercises/03-useRef/b-stopwatch/Stopwatch'
import SendLater from '../exercises/03-useRef/c-send-later/SendLater'
import MagicFinder from '../exercises/04-useMemo/a-lucky-ticket/MagicFinder'
import MemeSearch from '../exercises/04-useMemo/b-meme-search/MemeSearch'
import Dashboard from '../exercises/04-useMemo/c-stable-config/Dashboard'
import FriendList from '../exercises/05-useCallback/a-friend-list/FriendList'
import CookieClicker from '../exercises/05-useCallback/b-stale-callback/CookieClicker'
import UserCard, { type User } from '../exercises/05-useCallback/c-effect-loop/UserCard'
import PizzaBuilder from '../exercises/06-useReducer/a-pizza-builder/PizzaBuilder'
import Cart from '../exercises/06-useReducer/b-cart-reducer/Cart'
import LoginForm from '../exercises/06-useReducer/c-login-status/LoginForm'
import ThemeApp from '../exercises/07-useContext/a-theme/ThemeApp'
import AuthApp from '../exercises/07-useContext/b-auth-context/AuthApp'
import Profile from '../exercises/07-useContext/c-use-auth-hook/Profile'
import { AuthProvider } from '../exercises/07-useContext/c-use-auth-hook/auth'
import LightSwitch from '../exercises/08-custom-hooks/a-use-toggle/LightSwitch'
import Spoiler from '../exercises/08-custom-hooks/a-use-toggle/Spoiler'
import ThemeToggle from '../exercises/08-custom-hooks/b-use-local-storage/ThemeToggle'
import LiveSearch from '../exercises/08-custom-hooks/c-use-debounce/LiveSearch'

const readmes = import.meta.glob('../exercises/**/README.md', { query: '?raw', import: 'default', eager: true }) as Record<
  string,
  string
>
const readme = (path: string) => readmes[`../exercises/${path}/README.md`] ?? `Missing README for ${path}`

export type Part = { id: string; title: string; task: string; render: () => ReactNode }
export type Hook = { id: string; hook: string; lesson: string; parts: Part[] }

// ---------- fake props for the playground. Watch the browser Console (F12). ----------

const tickets = [7, 13, 42, 99, 3, 58]

// Pretends to be slow (about 300ms) so you can feel the difference useMemo makes.
function findLuckyTicket(list: number[]) {
  console.log('findLuckyTicket ran')
  const end = performance.now() + 300
  while (performance.now() < end) {
    // busy waiting on purpose
  }
  return 'Lucky ticket: #' + Math.max(...list)
}

const friends = [
  { id: 1, name: 'Aarav' },
  { id: 2, name: 'Diya' },
  { id: 3, name: 'Kabir' },
  { id: 4, name: 'Meera' },
]

const todos = [
  { id: 1, text: 'Finish 01 b', done: false },
  { id: 2, text: 'Drink water', done: false },
]

const memes = [
  'Distracted boyfriend',
  'Woman yelling at cat',
  'Grumpy cat',
  'This is fine dog',
  'Drake hotline bling',
  'Surprised Pikachu',
  'Doge',
  'Galaxy brain',
]

const greetingAppeared = () => console.log('Greeting appeared')
const sent = (message: string) => console.log('Sent:', message)
const filtering = () => console.log('filtering memes')
const logScore = (cookies: number) => console.log('Score:', cookies)
const search = (query: string) => console.log('searching for', query)

const people: Record<number, string> = { 1: 'Aarav', 2: 'Diya' }
const fetchUser = (id: number) => {
  console.log(`fetching user ${id}`)
  return new Promise<User>(resolve => setTimeout(() => resolve({ id, name: people[id] }), 300))
}

const login = (_email: string, password: string) =>
  new Promise<void>((resolve, reject) =>
    setTimeout(() => (password === 'hooks' ? resolve() : reject(new Error('Wrong password'))), 800),
  )

function UserCardDemo() {
  const [userId, setUserId] = useState(1)
  return (
    <div>
      <button onClick={() => setUserId(1)}>User 1</button>
      <button onClick={() => setUserId(2)}>User 2</button>
      <UserCard userId={userId} fetchUser={fetchUser} />
    </div>
  )
}

function ProfileDemo() {
  return (
    <div>
      <h4>Inside &lt;AuthProvider&gt;</h4>
      <ErrorBoundary>
        <AuthProvider>
          <Profile />
        </AuthProvider>
      </ErrorBoundary>
      <h4>Someone forgot the provider</h4>
      <ErrorBoundary>
        <Profile />
      </ErrorBoundary>
    </div>
  )
}

const part = (hook: string, id: string, title: string, render: () => ReactNode): Part => ({
  id,
  title,
  task: readme(`${hook}/${id}`),
  render,
})

const make = (id: string, hook: string, parts: [string, string, () => ReactNode][]): Hook => ({
  id,
  hook,
  lesson: readme(id),
  parts: parts.map(([pid, title, render]) => part(id, pid, title, render)),
})

export const hooks: Hook[] = [
  make('01-useState', 'useState', [
    ['a-slice-counter', 'Slice counter', () => <Counter />],
    ['b-plus-three', 'Slice party', () => <SliceParty />],
    ['c-todo-list', 'Todo list', () => <TodoList initialTodos={todos} />],
  ]),
  make('02-useEffect', 'useEffect', [
    ['a-dependency-array', 'Greeting', () => <Greeting onMount={greetingAppeared} />],
    ['b-joke-card', 'Joke card', () => <JokeCard />],
    ['c-keyboard-shortcut', 'Slide show', () => <SlideShow />],
  ]),
  make('03-useRef', 'useRef', [
    ['a-focus-input', 'Search box', () => <SearchBox />],
    ['b-stopwatch', 'Stopwatch', () => <Stopwatch />],
    ['c-send-later', 'Send later', () => <SendLater onSend={sent} />],
  ]),
  make('04-useMemo', 'useMemo', [
    ['a-lucky-ticket', 'Lucky ticket', () => <MagicFinder tickets={tickets} findMagic={findLuckyTicket} />],
    ['b-meme-search', 'Meme search', () => <MemeSearch memes={memes} onFilter={filtering} />],
    ['c-stable-config', 'Dashboard', () => <Dashboard />],
  ]),
  make('05-useCallback', 'useCallback', [
    ['a-friend-list', 'Friend list', () => <FriendList initialFriends={friends} />],
    ['b-stale-callback', 'Cookie clicker', () => <CookieClicker onLog={logScore} />],
    ['c-effect-loop', 'User card', () => <UserCardDemo />],
  ]),
  make('06-useReducer', 'useReducer', [
    ['a-pizza-builder', 'Pizza builder', () => <PizzaBuilder />],
    ['b-cart-reducer', 'Canteen cart', () => <Cart />],
    ['c-login-status', 'Login form', () => <LoginForm login={login} />],
  ]),
  make('07-useContext', 'useContext', [
    ['a-theme', 'Theme', () => <ThemeApp />],
    ['b-auth-context', 'Auth', () => <AuthApp />],
    ['c-use-auth-hook', 'useAuth', () => <ProfileDemo />],
  ]),
  make('08-custom-hooks', 'custom hooks', [
    [
      'a-use-toggle',
      'useToggle',
      () => (
        <>
          <LightSwitch />
          <Spoiler />
        </>
      ),
    ],
    ['b-use-local-storage', 'useLocalStorage', () => <ThemeToggle />],
    ['c-use-debounce', 'useDebounce', () => <LiveSearch onSearch={search} />],
  ]),
]
