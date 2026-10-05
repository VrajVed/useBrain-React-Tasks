// Gives back `value`, but only after it has stopped changing for `delay` milliseconds.
//
//   const query = useDebounce(text, 500)
//
// Right now it just hands the value straight back, so every key press searches.
export function useDebounce<T>(value: T, delay: number): T {
  return value
}
