import { useState } from 'react'

export default function LightSwitch() {
  const [on, setOn] = useState(false)
  const toggle = () => setOn(o => !o)

  return (
    <div className={on ? 'light' : 'dark'}>
      <p data-testid="bulb">{on ? '💡 on' : '🌑 off'}</p>
      <button onClick={toggle}>Flip the switch</button>
    </div>
  )
}
