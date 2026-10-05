import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import TodoList from './TodoList'

const start = () => [
  { id: 1, text: 'Finish 01 b', done: false },
  { id: 2, text: 'Drink water', done: false },
]

describe('01c useState: todo list', () => {
  it('shows a new todo after Add', async () => {
    render(<TodoList initialTodos={start()} />)
    await userEvent.type(screen.getByPlaceholderText('New todo'), 'Fork the repo')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(screen.getByText('Fork the repo')).toBeInTheDocument()
    expect(screen.getByTestId('left')).toHaveTextContent('3 left')
  })

  it('marks a todo as done when clicked', async () => {
    render(<TodoList initialTodos={start()} />)
    await userEvent.click(screen.getByText('Drink water'))
    expect(screen.getByText('Drink water')).toHaveClass('done')
    expect(screen.getByTestId('left')).toHaveTextContent('1 left')
  })

  it('never changes the original array or objects', async () => {
    const original = start()
    const snapshot = JSON.stringify(original)
    render(<TodoList initialTodos={original} />)
    await userEvent.type(screen.getByPlaceholderText('New todo'), 'Sleep')
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    await userEvent.click(screen.getByText('Finish 01 b'))
    expect(JSON.stringify(original), 'make new arrays and objects instead of changing the old ones').toBe(snapshot)
  })
})
