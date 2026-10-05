import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import JokeCard from './JokeCard'

const JOKE = { setup: 'Why do programmers prefer dark mode?', punchline: 'Because light attracts bugs.' }
const TEXT = JOKE.setup + ' ' + JOKE.punchline

describe('02 useEffect: JokeCard', () => {
  let fetchMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    fetchMock = vi.fn(() => Promise.resolve({ json: () => Promise.resolve([JOKE]) }))
    vi.stubGlobal('fetch', fetchMock)
  })

  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('shows Loading... first, then the joke', async () => {
    render(<JokeCard />)
    expect(screen.getByTestId('joke')).toHaveTextContent('Loading...')
    expect(await screen.findByText(TEXT)).toBeInTheDocument()
  })

  it('fetches exactly once, even after the joke shows up', async () => {
    render(<JokeCard />)
    await screen.findByText(TEXT)
    await new Promise(r => setTimeout(r, 50))
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it('cancels the request when the card goes away', () => {
    const { unmount } = render(<JokeCard />)
    const options = fetchMock.mock.calls[0]?.[1] as RequestInit | undefined
    expect(options?.signal, 'pass { signal } from an AbortController into fetch').toBeDefined()
    unmount()
    expect(options!.signal!.aborted, 'call controller.abort() in the cleanup function').toBe(true)
  })
})
