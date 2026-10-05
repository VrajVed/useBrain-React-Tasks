import { memo, useCallback, useState } from 'react'

const LogButton = memo(function LogButton({ onClick }: { onClick: () => void }) {
  return <button onClick={onClick}>Log my score</button>
})

export default function CookieClicker({ onLog }: { onLog: (cookies: number) => void }) {
  const [cookies, setCookies] = useState(0)

  const logScore = useCallback(() => {
    onLog(cookies)
  }, [])

  return (
    <div>
      <h1 data-testid="cookies">🍪 {cookies}</h1>
      <button onClick={() => setCookies(c => c + 1)}>Bake</button>
      <LogButton onClick={logScore} />
    </div>
  )
}
