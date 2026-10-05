import Counter from '../exercises/01-useState/Counter'
import JokeCard from '../exercises/02-useEffect/JokeCard'
import Stopwatch from '../exercises/03-useRef/Stopwatch'
import MagicFinder from '../exercises/04-useMemo/MagicFinder'
import FriendList from '../exercises/05-useCallback/FriendList'
import PizzaBuilder from '../exercises/06-useReducer/PizzaBuilder'
import ThemeApp from '../exercises/07-useContext/ThemeApp'
import ThemeToggle from '../exercises/08-useLocalStorage/ThemeToggle'

export const exercises = [
  { id: '01-useState', title: '01 - useState: Counter', Component: Counter },
  { id: '02-useEffect', title: '02 - useEffect: JokeCard', Component: JokeCard },
  { id: '03-useRef', title: '03 - useRef: Stopwatch', Component: Stopwatch },
  { id: '04-useMemo', title: '04 - useMemo: MagicFinder', Component: MagicFinder },
  { id: '05-useCallback', title: '05 - useCallback: FriendList', Component: FriendList },
  { id: '06-useReducer', title: '06 - useReducer: PizzaBuilder', Component: PizzaBuilder },
  { id: '07-useContext', title: '07 - useContext: ThemeApp', Component: ThemeApp },
  { id: '08-useLocalStorage', title: '08 - useLocalStorage: ThemeToggle', Component: ThemeToggle },
]
