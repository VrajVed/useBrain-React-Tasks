import { useMemo, useState } from 'react'

type Props = {
  memes: string[]
  onFilter?: () => void
}

export default function MemeSearch({ memes, onFilter }: Props) {
  const [query, setQuery] = useState('')
  const [dark, setDark] = useState(false)

  const results = useMemo(() => {
    onFilter?.()
    return memes.filter(m => m.toLowerCase().includes(query.toLowerCase()))
  }, [])

  return (
    <div className={dark ? 'dark' : 'light'}>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search memes" />
      <button onClick={() => setDark(d => !d)}>Toggle dark mode</button>
      <ul data-testid="results">
        {results.map(m => (
          <li key={m}>{m}</li>
        ))}
      </ul>
    </div>
  )
}
