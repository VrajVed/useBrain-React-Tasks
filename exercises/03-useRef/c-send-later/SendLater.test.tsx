import { render, screen, fireEvent, act, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import SendLater from './SendLater'
import source from './SendLater.tsx?raw'
import { code } from '../../../tests/source'

const type = (value: string) => fireEvent.change(screen.getByPlaceholderText('Message'), { target: { value } })
const wait = (ms: number) => act(() => { vi.advanceTimersByTime(ms) })

describe('03c useRef: send later', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'] })
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('sends after 3 seconds, not before', () => {
    const onSend = vi.fn()
    render(<SendLater onSend={onSend} />)
    type('hello')
    fireEvent.click(screen.getByRole('button', { name: /send in 3s/i }))
    wait(2900)
    expect(onSend).not.toHaveBeenCalled()
    wait(200)
    expect(onSend).toHaveBeenCalledTimes(1)
  })

  it('sends what is in the box when the 3 seconds are up', () => {
    const onSend = vi.fn()
    render(<SendLater onSend={onSend} />)
    type('see you')
    fireEvent.click(screen.getByRole('button', { name: /send in 3s/i }))
    wait(1000)
    type('see you at 5')
    wait(2500)
    expect(onSend).toHaveBeenCalledWith('see you at 5')
  })

  it('uses useRef to remember the latest message', () => {
    expect(code(source)).toMatch(/useRef\s*[<(]/)
  })
})
