import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import ThemeApp from './ThemeApp'
import source from './ThemeApp.tsx?raw'
import { code } from '../../tests/source'

describe('ThemeApp', () => {
  it('starts in light mode', () => {
    render(<ThemeApp />)
    expect(screen.getByTestId('card')).toHaveClass('light')
  })

  it('toggles to dark mode', async () => {
    render(<ThemeApp />)
    const toggle = screen.getByRole('button', { name: /toggle theme/i })
    await userEvent.click(toggle)
    expect(screen.getByTestId('card')).toHaveClass('dark')
  })

  it('uses context instead of passing theme through props', () => {
    const src = code(source)
    expect(src, 'create a context with createContext').toMatch(/createContext\s*[<(]/)
    expect(src, 'read it in Card with useContext').toMatch(/useContext\s*\(/)
    expect(src, 'Layout and Card should not receive theme as a prop').not.toMatch(/theme=\{/)
  })
})
