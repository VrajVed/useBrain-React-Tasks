import { useEffect, useState } from 'react'

export type User = { id: number; name: string }

type Props = {
  userId: number
  fetchUser: (id: number) => Promise<User>
}

export default function UserCard({ userId, fetchUser }: Props) {
  const [user, setUser] = useState<User | null>(null)

  const load = () => {
    fetchUser(userId).then(setUser)
  }

  useEffect(() => {
    load()
  }, [load])

  return (
    <div>
      <p data-testid="name">{user ? user.name : 'Loading...'}</p>
      <button onClick={load}>Refresh</button>
    </div>
  )
}
