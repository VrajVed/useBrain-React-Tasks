import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Greeting from './Greeting'

describe('02a useEffect: dependency array', () => {
  it('sets the title when it appears', () => {
    render(<Greeting />)
    expect(document.title).toBe('Hi, stranger')
  })

  it('updates the title while you type', async () => {
    render(<Greeting />)
    await userEvent.type(screen.getByPlaceholderText('Your name'), 'Vraj')
    expect(document.title).toBe('Hi, Vraj')
  })

  it('calls onMount only once, no matter how much you type', async () => {
    const onMount = vi.fn()
    render(<Greeting onMount={onMount} />)
    await userEvent.type(screen.getByPlaceholderText('Your name'), 'Aarav')
    expect(onMount).toHaveBeenCalledTimes(1)
  })
})
