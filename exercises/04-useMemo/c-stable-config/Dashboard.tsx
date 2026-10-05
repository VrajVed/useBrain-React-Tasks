import { memo, useRef, useState } from 'react'

type Config = { color: string; size: number }

const Chart = memo(function Chart({ config }: { config: Config }) {
  const renders = useRef(0)
  renders.current += 1
  return (
    <div data-testid="chart" style={{ color: config.color, fontSize: config.size }}>
      📈 chart in {config.color} (renders: {renders.current})
    </div>
  )
})

export default function Dashboard() {
  const [likes, setLikes] = useState(0)
  const [color, setColor] = useState('purple')

  const config = { color, size: 24 }

  return (
    <div>
      <button onClick={() => setLikes(l => l + 1)}>Like ({likes})</button>
      <button onClick={() => setColor(c => (c === 'purple' ? 'orange' : 'purple'))}>Change color</button>
      <Chart config={config} />
    </div>
  )
}
