import { useState } from 'react'

export default function SendLater({ onSend }: { onSend: (message: string) => void }) {
  const [message, setMessage] = useState('')
  const [waiting, setWaiting] = useState(false)

  const sendLater = () => {
    setWaiting(true)
    setTimeout(() => {
      onSend(message)
      setWaiting(false)
    }, 3000)
  }

  return (
    <div>
      <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Message" />
      <button onClick={sendLater} disabled={waiting}>
        {waiting ? 'Sending in 3s...' : 'Send in 3s'}
      </button>
      <p>Click send, then keep typing. What gets sent?</p>
    </div>
  )
}
