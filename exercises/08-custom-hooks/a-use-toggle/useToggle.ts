// Your first custom hook.
//
//   const [isOn, toggle] = useToggle()        starts false
//   const [isOpen, toggle] = useToggle(true)  starts true
//
// In:  initial   the starting value (default false)
// Out: [value, toggle]   toggle() flips it
export function useToggle(initial = false): readonly [boolean, () => void] {
  throw new Error('useToggle is not written yet')
}
