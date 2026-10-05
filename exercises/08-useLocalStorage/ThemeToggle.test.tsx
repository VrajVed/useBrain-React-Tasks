import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import ThemeToggle from './ThemeToggle'

const storage: Record<string, string> = {}

describe('ThemeToggle', () => {
  beforeEach(() => {
    Object.keys(storage).forEach(k => delete storage[k])
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => { storage[key] = value },
      removeItem: (key: string) => { delete storage[key] },
      clear: () => { Object.keys(storage).forEach(k => delete storage[k]) },
    })
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('starts in light mode', () => {
    render(<ThemeToggle />)
    expect(screen.getByTestId('theme-toggle')).toHaveClass('light')
  })

  it('persists dark mode after remount', async () => {
    const { unmount } = render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(screen.getByTestId('theme-toggle')).toHaveClass('dark')
    unmount()

    render(<ThemeToggle />)
    expect(screen.getByTestId('theme-toggle')).toHaveClass('dark')
  })

  it('saves the value to localStorage', async () => {
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(storage.theme).toBe('"dark"')
  })
})
