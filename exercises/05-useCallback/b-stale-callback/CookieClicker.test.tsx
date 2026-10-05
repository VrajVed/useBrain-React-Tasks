import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import CookieClicker from './CookieClicker'
import source from './CookieClicker.tsx?raw'
import { code } from '../../../tests/source'

describe('05b useCallback: stale callback', () => {
  it('logs the real score', async () => {
    const onLog = vi.fn()
    render(<CookieClicker onLog={onLog} />)
    for (let i = 0; i < 3; i++) await userEvent.click(screen.getByRole('button', { name: 'Bake' }))
    await userEvent.click(screen.getByRole('button', { name: /log my score/i }))
    expect(onLog).toHaveBeenLastCalledWith(3)
  })

  it('logs the new score after baking more', async () => {
    const onLog = vi.fn()
    render(<CookieClicker onLog={onLog} />)
    await userEvent.click(screen.getByRole('button', { name: 'Bake' }))
    await userEvent.click(screen.getByRole('button', { name: /log my score/i }))
    await userEvent.click(screen.getByRole('button', { name: 'Bake' }))
    await userEvent.click(screen.getByRole('button', { name: 'Bake' }))
    await userEvent.click(screen.getByRole('button', { name: /log my score/i }))
    expect(onLog.mock.calls.map(c => c[0])).toEqual([1, 3])
  })

  it('still uses useCallback', () => {
    expect(code(source)).toMatch(/useCallback\s*[<(]/)
  })
})
