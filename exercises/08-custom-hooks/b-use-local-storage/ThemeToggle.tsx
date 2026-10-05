import { useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  return (
    <div data-testid="theme-toggle" className={theme}>
      <p>Theme: {theme}</p>
      <button onClick={() => setTheme(t => (t === 'light' ? 'dark' : 'light'))}>
        Toggle theme
      </button>
    </div>
  )
}
