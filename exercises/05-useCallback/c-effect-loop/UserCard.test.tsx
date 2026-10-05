import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import UserCard from './UserCard'
import source from './UserCard.tsx?raw'
import { code } from '../../../tests/source'

const names: Record<number, string> = { 1: 'Aarav', 2: 'Diya' }
const settle = () => new Promise(r => setTimeout(r, 60))

describe('05c useCallback: effect loop', () => {
  it('loads the user exactly once', async () => {
    const fetchUser = vi.fn((id: number) => Promise.resolve({ id, name: names[id] }))
    render(<UserCard userId={1} fetchUser={fetchUser} />)
    expect(await screen.findByText('Aarav')).toBeInTheDocument()
    await settle()
    expect(fetchUser).toHaveBeenCalledTimes(1)
  })

  it('loads again when userId changes, and only then', async () => {
    const fetchUser = vi.fn((id: number) => Promise.resolve({ id, name: names[id] }))
    const { rerender } = render(<UserCard userId={1} fetchUser={fetchUser} />)
    await screen.findByText('Aarav')
    await settle()
    rerender(<UserCard userId={2} fetchUser={fetchUser} />)
    expect(await screen.findByText('Diya')).toBeInTheDocument()
    await settle()
    expect(fetchUser).toHaveBeenCalledTimes(2)
    expect(fetchUser).toHaveBeenLastCalledWith(2)
  })

  it('keeps load as a useCallback function (the Refresh button uses it too)', () => {
    expect(code(source)).toMatch(/const load\s*=\s*useCallback\s*\(/)
  })
})
