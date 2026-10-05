import { useEffect, useState } from 'react'

export default function Greeting({ onMount }: { onMount?: () => void }) {
  const [name, setName] = useState('')

  // Should run ONCE, when the greeting first appears.
  useEffect(() => {
    onMount?.()
  })

  // Should run whenever the name changes.
  useEffect(() => {
    document.title = name ? `Hi, ${name}` : 'Hi, stranger'
  }, [])

  return (
    <div>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
      <p>Look at the browser tab title.</p>
    </div>
  )
}
