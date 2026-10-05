import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'

export default function LiveSearch({ onSearch }: { onSearch: (query: string) => void }) {
  const [text, setText] = useState('')
  const query = useDebounce(text, 500)

  useEffect(() => {
    if (query) onSearch(query)
  }, [query, onSearch])

  return (
    <div>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Search" />
      <p>Searching for: {query || '...'}</p>
    </div>
  )
}
