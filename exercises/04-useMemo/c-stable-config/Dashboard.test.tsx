import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Dashboard from './Dashboard'

const chart = () => screen.getByTestId('chart')

describe('04c useMemo: stable config', () => {
  it('does not re-render the chart when you like', async () => {
    render(<Dashboard />)
    expect(chart()).toHaveTextContent('renders: 1')
    await userEvent.click(screen.getByRole('button', { name: /like/i }))
    await userEvent.click(screen.getByRole('button', { name: /like/i }))
    expect(chart()).toHaveTextContent('renders: 1')
  })

  it('does re-render the chart when the color changes', async () => {
    render(<Dashboard />)
    await userEvent.click(screen.getByRole('button', { name: /change color/i }))
    expect(chart()).toHaveTextContent('chart in orange')
    expect(chart()).toHaveTextContent('renders: 2')
  })
})
