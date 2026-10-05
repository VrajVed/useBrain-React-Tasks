import { useState } from 'react'

export default function Spoiler() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(o => !o)

  return (
    <div>
      <button onClick={toggle}>{open ? 'Hide spoiler' : 'Show spoiler'}</button>
      {open && <p>Bruce Wayne is Batman.</p>}
    </div>
  )
}
