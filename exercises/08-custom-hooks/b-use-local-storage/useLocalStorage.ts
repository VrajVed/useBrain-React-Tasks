// Your custom hook goes here.
//
// It works like useState, but it also remembers the value in localStorage.
//
//   const [theme, setTheme] = useLocalStorage('theme', 'light')
//
// In:  key           the name to save it under in localStorage
//      initialValue  what to use when nothing is saved yet
// Out: [value, setValue]  exactly like useState gives you
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): readonly [T, (next: T | ((previous: T) => T)) => void] {
  throw new Error('useLocalStorage is not implemented yet')
}
