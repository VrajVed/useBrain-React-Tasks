import type { ReactNode } from 'react'
import Counter from '../exercises/01-useState/Counter'
import JokeCard from '../exercises/02-useEffect/JokeCard'
import Stopwatch from '../exercises/03-useRef/Stopwatch'
import MagicFinder from '../exercises/04-useMemo/MagicFinder'
import FriendList from '../exercises/05-useCallback/FriendList'
import PizzaBuilder from '../exercises/06-useReducer/PizzaBuilder'
import ThemeApp from '../exercises/07-useContext/ThemeApp'
import ThemeToggle from '../exercises/08-useLocalStorage/ThemeToggle'
import r01 from '../exercises/01-useState/README.md?raw'
import r02 from '../exercises/02-useEffect/README.md?raw'
import r03 from '../exercises/03-useRef/README.md?raw'
import r04 from '../exercises/04-useMemo/README.md?raw'
import r05 from '../exercises/05-useCallback/README.md?raw'
import r06 from '../exercises/06-useReducer/README.md?raw'
import r07 from '../exercises/07-useContext/README.md?raw'
import r08 from '../exercises/08-useLocalStorage/README.md?raw'

export type Exercise = {
  id: string
  hook: string
  title: string
  readme: string
  render: () => ReactNode
}

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

export const exercises: Exercise[] = [
  { id: '01-useState', hook: 'useState', title: 'Pizza slice counter', readme: r01, render: () => <Counter /> },
  { id: '02-useEffect', hook: 'useEffect', title: 'Joke card', readme: r02, render: () => <JokeCard /> },
  { id: '03-useRef', hook: 'useRef', title: 'Stopwatch', readme: r03, render: () => <Stopwatch /> },
  {
    id: '04-useMemo',
    hook: 'useMemo',
    title: 'Lucky ticket finder',
    readme: r04,
    render: () => <MagicFinder tickets={tickets} findMagic={findLuckyTicket} />,
  },
  {
    id: '05-useCallback',
    hook: 'useCallback',
    title: 'Gaming lobby friend list',
    readme: r05,
    render: () => <FriendList initialFriends={friends} />,
  },
  { id: '06-useReducer', hook: 'useReducer', title: 'Pizza builder', readme: r06, render: () => <PizzaBuilder /> },
  { id: '07-useContext', hook: 'useContext', title: 'Theme without prop drilling', readme: r07, render: () => <ThemeApp /> },
  {
    id: '08-useLocalStorage',
    hook: 'custom hook',
    title: 'useLocalStorage',
    readme: r08,
    render: () => <ThemeToggle />,
  },
]
