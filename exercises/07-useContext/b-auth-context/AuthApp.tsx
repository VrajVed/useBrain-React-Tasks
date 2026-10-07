import { useState } from 'react'

type User = { name: string }
type AuthProps = { user: User | null; onLogin: () => void; onLogout: () => void }

function Button({ user, onLogin, onLogout }: AuthProps) {
  return user ? <button onClick={onLogout}>Log out</button> : <button onClick={onLogin}>Log in</button>
}

function Login({ user, onLogin, onLogout }: AuthProps) {
  return (
    <div className="login">
      <Button user={user} onLogin={onLogin} onLogout={onLogout} />
    </div>
  )
}

function Navbar({ user, onLogin, onLogout }: AuthProps) {
  return (
    <nav>
      <span data-testid="greeting">{user ? `Hi, ${user.name}` : 'Hi, guest'}</span>
      <Login user={user} onLogin={onLogin} onLogout={onLogout} />
    </nav>
  )
}

export default function AuthApp() {
  const [user, setUser] = useState<User | null>(null)
  return <Navbar user={user} onLogin={() => setUser({ name: 'Random Person' })} onLogout={() => setUser(null)} />
}
