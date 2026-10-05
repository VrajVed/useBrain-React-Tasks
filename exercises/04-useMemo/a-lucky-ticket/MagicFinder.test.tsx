import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import MagicFinder from './MagicFinder'

describe('MagicFinder', () => {
  it('shows the magic value', () => {
    const findMagic = vi.fn(() => 'lucky-7')
    render(<MagicFinder tickets={[1, 2, 3]} findMagic={findMagic} />)
    expect(screen.getByTestId('magic')).toHaveTextContent('lucky-7')
  })

  it('does not recompute when an unrelated state changes', async () => {
    const findMagic = vi.fn(() => 'lucky-7')
    render(<MagicFinder tickets={[1, 2, 3]} findMagic={findMagic} />)

    const callsAfterFirstRender = findMagic.mock.calls.length

    const toggle = screen.getByRole('button', { name: /toggle mode/i })
    await userEvent.click(toggle)
    await userEvent.click(toggle)

    expect(findMagic).toHaveBeenCalledTimes(callsAfterFirstRender)
  })
})
