import { useState } from 'react'

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [running, setRunning] = useState(false)
  const [laps, setLaps] = useState<number[]>([])

  let intervalId: ReturnType<typeof setInterval> | null = null

  const toggle = () => {
    if (!running) {
      setRunning(true)
      intervalId = setInterval(() => setTime(t => t + 1), 100)
    } else {
      setRunning(false)
      if (intervalId) clearInterval(intervalId)
    }
  }

  const lap = () => {
    setLaps(prev => [...prev, time])
  }

  return (
    <div>
      <div data-testid="time">{time}</div>
      <button onClick={toggle}>{running ? 'Stop' : 'Start'}</button>
      <button onClick={lap}>Lap</button>
      <ul data-testid="laps">
        {laps.map((lapTime, i) => (
          <li key={i}>{lapTime}</li>
        ))}
      </ul>
    </div>
  )
}
