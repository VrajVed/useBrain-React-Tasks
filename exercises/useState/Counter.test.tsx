import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Counter from './Counter'

describe('Counter', () => {
  it('starts at 0', () => {
    render(<Counter />)
    expect(screen.getByText(/Slices: 0/i)).toBeInTheDocument()
  })

  it('increments when + is clicked', async () => {
    render(<Counter />)
    const addButton = screen.getByRole('button', { name: '+' })
    await userEvent.click(addButton)
    expect(screen.getByText(/Slices: 1/i)).toBeInTheDocument()
  })

  it('decrements when - is clicked', async () => {
    render(<Counter />)
    const removeButton = screen.getByRole('button', { name: '-' })
    await userEvent.click(removeButton)
    expect(screen.getByText(/Slices: -1/i)).toBeInTheDocument()
  })

  it('supports multiple clicks', async () => {
    render(<Counter />)
    const addButton = screen.getByRole('button', { name: '+' })
    await userEvent.click(addButton)
    await userEvent.click(addButton)
    await userEvent.click(addButton)
    expect(screen.getByText(/Slices: 3/i)).toBeInTheDocument()
  })
})
