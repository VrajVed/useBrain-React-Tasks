import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import LoginForm from './LoginForm'
import source from './LoginForm.tsx?raw'
import { code } from '../../../tests/source'

// A login() whose answer we control from the test.
function controlledLogin() {
  let finish: (ok: boolean) => void = () => {}
  const login = vi.fn(
    () =>
      new Promise<void>((resolve, reject) => {
        finish = ok => (ok ? resolve() : reject(new Error('Wrong password')))
      }),
  )
  return { login, answer: (ok: boolean) => act(async () => finish(ok)) }
}
const submit = () => fireEvent.click(screen.getByRole('button'))

describe('06c useReducer: login status', () => {
  it('shows Logging in... while waiting, then the error', async () => {
    const { login, answer } = controlledLogin()
    render(<LoginForm login={login} />)
    submit()
    expect(screen.getByRole('button')).toHaveTextContent('Logging in...')
    expect(screen.getByRole('button')).toBeDisabled()
    await answer(false)
    expect(screen.getByRole('alert')).toHaveTextContent('Wrong password')
    expect(screen.getByRole('button')).toHaveTextContent('Log in')
  })

  it('hides the old error while trying again', async () => {
    const { login, answer } = controlledLogin()
    render(<LoginForm login={login} />)
    submit()
    await answer(false)
    submit()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('shows only the welcome after a retry works', async () => {
    const { login, answer } = controlledLogin()
    render(<LoginForm login={login} />)
    submit()
    await answer(false)
    submit()
    await answer(true)
    expect(screen.getByText('Welcome back!')).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('keeps the login status in useReducer', () => {
    expect(code(source)).toMatch(/useReducer\s*[<(]/)
  })
})
