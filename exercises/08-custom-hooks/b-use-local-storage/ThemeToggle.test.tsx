import { render, screen, cleanup, renderHook, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import ThemeToggle from './ThemeToggle'
import { useLocalStorage } from './useLocalStorage'
import source from './ThemeToggle.tsx?raw'
import { code } from '../../../tests/source'

const storage: Record<string, string> = {}

describe('08 custom hook: useLocalStorage', () => {
  beforeEach(() => {
    Object.keys(storage).forEach(k => delete storage[k])
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => storage[key] ?? null,
      setItem: (key: string, value: string) => { storage[key] = String(value) },
      removeItem: (key: string) => { delete storage[key] },
      clear: () => { Object.keys(storage).forEach(k => delete storage[k]) },
    })
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('hook: returns the initial value when nothing is saved', () => {
    const { result } = renderHook(() => useLocalStorage('score', 5))
    expect(result.current[0]).toBe(5)
  })

  it('hook: reads a value that was already saved', () => {
    storage.score = '42'
    const { result } = renderHook(() => useLocalStorage('score', 5))
    expect(result.current[0]).toBe(42)
  })

  it('hook: the setter updates the value and saves it', () => {
    const { result } = renderHook(() => useLocalStorage('score', 5))
    act(() => { result.current[1](9) })
    expect(result.current[0]).toBe(9)
    expect(storage.score).toBe('9')
  })

  it('ThemeToggle uses your hook', () => {
    expect(code(source)).toMatch(/useLocalStorage\s*[<(]/)
  })

  it('starts in light mode', () => {
    render(<ThemeToggle />)
    expect(screen.getByTestId('theme-toggle')).toHaveClass('light')
  })

  it('remembers dark mode after the page comes back', async () => {
    const { unmount } = render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(screen.getByTestId('theme-toggle')).toHaveClass('dark')
    unmount()

    render(<ThemeToggle />)
    expect(screen.getByTestId('theme-toggle')).toHaveClass('dark')
  })

  it('saves the theme under the key "theme"', async () => {
    render(<ThemeToggle />)
    await userEvent.click(screen.getByRole('button', { name: /toggle theme/i }))
    expect(storage.theme).toBe('"dark"')
  })
})
