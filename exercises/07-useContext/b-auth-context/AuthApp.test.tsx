import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import AuthApp from './AuthApp'
import source from './AuthApp.tsx?raw'
import { code } from '../../../tests/source'

describe('07b useContext: auth context', () => {
  it('logs in and out', async () => {
    render(<AuthApp />)
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hi, guest')
    await userEvent.click(screen.getByRole('button', { name: 'Log in' }))
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hi, Random Person')
    await userEvent.click(screen.getByRole('button', { name: 'Log out' }))
    expect(screen.getByTestId('greeting')).toHaveTextContent('Hi, guest')
  })

  it('shares user, login and logout through context instead of props', () => {
    const src = code(source)
    expect(src, 'create the context with createContext').toMatch(/createContext\s*[<(]/)
    expect(src, 'read it with useContext').toMatch(/useContext\s*\(/)
    expect(src, 'nothing should be passed down as user=, onLogin= or onLogout= anymore').not.toMatch(/\b(user|onLogin|onLogout)=\{/)
  })
})
