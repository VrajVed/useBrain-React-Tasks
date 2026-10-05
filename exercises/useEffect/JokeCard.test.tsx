import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import JokeCard from './JokeCard'

describe('JokeCard', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          json: () =>
            Promise.resolve([
              {
                setup: 'Why do programmers prefer dark mode?',
                punchline: 'Because light attracts bugs.',
              },
            ]),
        }),
      ),
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows loading then the joke', async () => {
    render(<JokeCard />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
    await waitFor(() =>
      expect(screen.getByTestId('joke')).toHaveTextContent(
        'Why do programmers prefer dark mode? Because light attracts bugs.',
      ),
    )
  })

  it('fetches only once', async () => {
    render(<JokeCard />)
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1))
  })

  it('does not update state after unmount', async () => {
    const { unmount } = render(<JokeCard />)
    unmount()
    await new Promise(r => setTimeout(r, 50))
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
