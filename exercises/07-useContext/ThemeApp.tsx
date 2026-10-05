import { useState } from 'react'

function Card({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <div data-testid="card" className={theme}>
      Current theme: {theme}
    </div>
  )
}

function Layout({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <main>
      <Card theme={theme} />
    </main>
  )
}

export default function ThemeApp() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div>
      <Layout theme={theme} />
      <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
        Toggle theme
      </button>
    </div>
  )
}
