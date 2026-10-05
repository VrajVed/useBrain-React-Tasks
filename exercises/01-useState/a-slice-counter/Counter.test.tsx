import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Counter from './Counter'

describe('Counter', () => {
  it('starts at 0', () => {
    render(<Counter />)
    expect(screen.getByTestId('count')).toHaveTextContent('0')
  })

  it('increments when + is clicked', async () => {
    render(<Counter />)
    await userEvent.click(screen.getByRole('button', { name: '+' }))
    expect(screen.getByTestId('count')).toHaveTextContent('1')
  })

  it('decrements when - is clicked', async () => {
    render(<Counter />)
    await userEvent.click(screen.getByRole('button', { name: '-' }))
    expect(screen.getByTestId('count')).toHaveTextContent('-1')
  })

  it('supports multiple clicks', async () => {
    render(<Counter />)
    const addButton = screen.getByRole('button', { name: '+' })
    await userEvent.click(addButton)
    await userEvent.click(addButton)
    await userEvent.click(addButton)
    expect(screen.getByTestId('count')).toHaveTextContent('3')
  })
})
