import { useEffect } from 'react'

export default function SearchBox() {
  // A plain object: it is thrown away and made again on every render,
  // and it is not connected to the input at all.
  const inputRef = { current: null as HTMLInputElement | null }

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div>
      <input placeholder="Search memes" />
      <button onClick={() => inputRef.current?.focus()}>Focus search</button>
    </div>
  )
}
