import { render, screen, fireEvent, act, renderHook, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useDebounce } from './useDebounce'
import LiveSearch from './LiveSearch'

const wait = (ms: number) => act(() => { vi.advanceTimersByTime(ms) })

describe('08c custom hook: useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval'] })
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('hook: keeps the old value until the delay is over', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 500), { initialProps: { v: 'a' } })
    expect(result.current).toBe('a')
    rerender({ v: 'ab' })
    wait(499)
    expect(result.current).toBe('a')
    wait(1)
    expect(result.current).toBe('ab')
  })

  it('hook: starts waiting again on every change', () => {
    const { result, rerender } = renderHook(({ v }) => useDebounce(v, 500), { initialProps: { v: 'a' } })
    rerender({ v: 'ab' })
    wait(300)
    rerender({ v: 'abc' })
    wait(300)
    expect(result.current).toBe('a')
    wait(200)
    expect(result.current).toBe('abc')
  })

  it('hook: leaves no timer behind when it goes away', () => {
    const { rerender, unmount } = renderHook(({ v }) => useDebounce(v, 500), { initialProps: { v: 'a' } })
    rerender({ v: 'ab' })
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('LiveSearch searches once after you stop typing', () => {
    const onSearch = vi.fn()
    render(<LiveSearch onSearch={onSearch} />)
    const box = screen.getByPlaceholderText('Search')
    for (const text of ['r', 're', 'rea', 'reac', 'react']) {
      fireEvent.change(box, { target: { value: text } })
      wait(100)
    }
    expect(onSearch).not.toHaveBeenCalled()
    wait(500)
    expect(onSearch).toHaveBeenCalledTimes(1)
    expect(onSearch).toHaveBeenCalledWith('react')
  })
})
