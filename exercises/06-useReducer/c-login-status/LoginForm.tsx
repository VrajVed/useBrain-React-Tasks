import { useState, type FormEvent } from 'react'

type Props = { login: (email: string, password: string) => Promise<void> }

export default function LoginForm({ login }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password)
      setSuccess(true)
    } catch (err) {
      setError((err as Error).message)
    }
    setLoading(false)
  }

  return (
    <form onSubmit={submit}>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" />
      <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
      {error && <p role="alert">{error}</p>}
      {success && <p>Welcome back!</p>}
    </form>
  )
}
