import { useAuth } from './auth'

export default function Profile() {
  const { user, login, logout } = useAuth()

  return user ? (
    <p>
      Signed in as {user.name} <button onClick={logout}>Log out</button>
    </p>
  ) : (
    <button onClick={() => login('Vraj')}>Log in as Vraj</button>
  )
}
