import { createContext, useContext, useState, type ReactNode } from 'react'

type User = { name: string }
type Auth = { user: User | null; login: (name: string) => void; logout: () => void }

const AuthContext = createContext<Auth | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const value: Auth = { user, login: name => setUser({ name }), logout: () => setUser(null) }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Fix this. The "as Auth" is a lie: outside an <AuthProvider> this is null.
export function useAuth() {
  return useContext(AuthContext) as Auth
}
