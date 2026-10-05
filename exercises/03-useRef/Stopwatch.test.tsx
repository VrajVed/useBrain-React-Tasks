import { render, screen, fireEvent, act, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import Stopwatch from './Stopwatch'
import source from './Stopwatch.tsx?raw'
import { code } from '../../tests/source'

const time = () => Number(screen.getByTestId('time').textContent)
const wait = (ms: number) => act(() => { vi.advanceTimersByTime(ms) })
const press = (name: RegExp) => fireEvent.click(screen.getByRole('button', { name }))

describe('03 useRef: Stopwatch', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setInterval', 'clearInterval', 'setTimeout', 'clearTimeout'] })
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('counts up after Start', () => {
    render(<Stopwatch />)
    press(/start/i)
    wait(1000)
    expect(time()).toBeGreaterThan(0)
  })

  it('actually stops after Stop', () => {
    render(<Stopwatch />)
    press(/start/i)
    wait(500)
    press(/stop/i)
    const frozen = time()
    wait(2000)
    expect(time()).toBe(frozen)
  })

  it('runs at the same speed after stopping and starting again', () => {
    render(<Stopwatch />)
    press(/start/i)
    wait(1000)
    press(/stop/i)
    const first = time()
    press(/start/i)
    wait(1000)
    press(/stop/i)
    expect(time() - first).toBe(first)
  })

  it('records a lap', () => {
    render(<Stopwatch />)
    press(/start/i)
    wait(300)
    press(/lap/i)
    expect(screen.getByTestId('laps').children.length).toBe(1)
  })

  it('clears the interval when the stopwatch goes away', () => {
    const { unmount } = render(<Stopwatch />)
    press(/start/i)
    wait(300)
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('keeps the interval id in useRef', () => {
    expect(code(source)).toMatch(/useRef\s*[<(]/)
  })
})
