import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import SlideShow from './SlideShow'

const right = () => fireEvent.keyDown(window, { key: 'ArrowRight' })
const position = () => screen.getByTestId('position').textContent

describe('02c useEffect: keyboard shortcut', () => {
  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
  })

  it('moves one slide per key press', () => {
    render(<SlideShow />)
    right()
    expect(position()).toBe('Slide 2 of 5')
    right()
    expect(position()).toBe('Slide 3 of 5')
    right()
    expect(position()).toBe('Slide 4 of 5')
  })

  it('removes every keydown listener it added when it goes away', () => {
    const add = vi.spyOn(window, 'addEventListener')
    const remove = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<SlideShow />)
    right()
    right()
    unmount()
    const added = add.mock.calls.filter(c => c[0] === 'keydown').map(c => c[1])
    const removed = remove.mock.calls.filter(c => c[0] === 'keydown').map(c => c[1])
    expect(added.length).toBeGreaterThan(0)
    expect(removed, 'return a cleanup function that calls removeEventListener').toEqual(expect.arrayContaining(added))
  })
})
