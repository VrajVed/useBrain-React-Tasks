import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import ThemeApp from './ThemeApp'

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
})
