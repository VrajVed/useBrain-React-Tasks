import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import PizzaBuilder from './PizzaBuilder'

describe('PizzaBuilder', () => {
  it('starts with base price', () => {
    render(<PizzaBuilder />)
    expect(screen.getByTestId('total')).toHaveTextContent('Total: 100')
  })

  it('adds toppings and updates total', async () => {
    render(<PizzaBuilder />)
    await userEvent.click(screen.getByRole('button', { name: /add cheese/i }))
    await userEvent.click(screen.getByRole('button', { name: /add mushroom/i }))
    expect(screen.getByTestId('toppings')).toHaveTextContent('cheese')
    expect(screen.getByTestId('toppings')).toHaveTextContent('mushroom')
    expect(screen.getByTestId('total')).toHaveTextContent('Total: 160')
  })

  it('removes a topping and updates total', async () => {
    render(<PizzaBuilder />)
    await userEvent.click(screen.getByRole('button', { name: /add cheese/i }))
    await userEvent.click(screen.getByRole('button', { name: /add cheese/i }))
    await userEvent.click(screen.getByRole('button', { name: /add mushroom/i }))
    await userEvent.click(screen.getByRole('button', { name: /remove cheese/i }))
    expect(screen.getByTestId('total')).toHaveTextContent('Total: 130')
  })
})
