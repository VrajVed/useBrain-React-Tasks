import { render, screen, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Profile from './Profile'
import { AuthProvider, useAuth } from './auth'

describe('07c useContext: useAuth hook', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('works inside AuthProvider', async () => {
    render(
      <AuthProvider>
        <Profile />
      </AuthProvider>,
    )
    await userEvent.click(screen.getByRole('button', { name: /log in as random person/i }))
    expect(screen.getByText(/signed in as random person/i)).toBeInTheDocument()
  })

  it('throws a clear error when used outside AuthProvider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => renderHook(() => useAuth())).toThrow(/useAuth must be used inside <AuthProvider>/)
  })
})
