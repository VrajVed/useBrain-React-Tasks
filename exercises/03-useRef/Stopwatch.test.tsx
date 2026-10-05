import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Stopwatch from './Stopwatch'

describe('Stopwatch', () => {
  it('starts counting', async () => {
    render(<Stopwatch />)
    await userEvent.click(screen.getByRole('button', { name: /start/i }))
    await waitFor(() => expect(screen.getByTestId('time')).not.toHaveTextContent('0'), {
      timeout: 2000,
    })
  })

  it('stops counting', async () => {
    render(<Stopwatch />)
    await userEvent.click(screen.getByRole('button', { name: /start/i }))
    await waitFor(() => expect(screen.getByTestId('time')).not.toHaveTextContent('0'), {
      timeout: 2000,
    })
    const paused = Number(screen.getByTestId('time').textContent)
    await userEvent.click(screen.getByRole('button', { name: /stop/i }))
    await new Promise(r => setTimeout(r, 150))
    expect(screen.getByTestId('time')).toHaveTextContent(String(paused))
  })

  it('does not create multiple intervals', async () => {
    render(<Stopwatch />)
    const toggle = screen.getByRole('button', { name: /start/i })
    await userEvent.click(toggle)
    await new Promise(r => setTimeout(r, 80))
    await userEvent.click(toggle)
    const afterFirst = Number(screen.getByTestId('time').textContent)
    await userEvent.click(toggle)
    await new Promise(r => setTimeout(r, 80))
    await userEvent.click(toggle)
    const afterSecond = Number(screen.getByTestId('time').textContent)

    expect(afterSecond).toBeGreaterThanOrEqual(afterFirst)
    expect(afterSecond).toBeLessThanOrEqual(40)
  })

  it('records laps', async () => {
    render(<Stopwatch />)
    await userEvent.click(screen.getByRole('button', { name: /start/i }))
    await new Promise(r => setTimeout(r, 50))
    await userEvent.click(screen.getByRole('button', { name: /lap/i }))
    expect(screen.getByTestId('laps').children.length).toBe(1)
  })
})
