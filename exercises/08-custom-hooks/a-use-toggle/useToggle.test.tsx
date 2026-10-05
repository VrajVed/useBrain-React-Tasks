import { render, screen, renderHook, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { useToggle } from './useToggle'
import LightSwitch from './LightSwitch'
import Spoiler from './Spoiler'
import lightSource from './LightSwitch.tsx?raw'
import spoilerSource from './Spoiler.tsx?raw'
import { code } from '../../../tests/source'

describe('08a custom hook: useToggle', () => {
  it('hook: starts false by default', () => {
    const { result } = renderHook(() => useToggle())
    expect(result.current[0]).toBe(false)
  })

  it('hook: can start true', () => {
    const { result } = renderHook(() => useToggle(true))
    expect(result.current[0]).toBe(true)
  })

  it('hook: toggle flips it, again and again', () => {
    const { result } = renderHook(() => useToggle())
    act(() => result.current[1]())
    expect(result.current[0]).toBe(true)
    act(() => result.current[1]())
    expect(result.current[0]).toBe(false)
  })

  it('LightSwitch works', async () => {
    render(<LightSwitch />)
    await userEvent.click(screen.getByRole('button', { name: /flip/i }))
    expect(screen.getByTestId('bulb')).toHaveTextContent('on')
  })

  it('Spoiler works', async () => {
    render(<Spoiler />)
    await userEvent.click(screen.getByRole('button', { name: /show spoiler/i }))
    expect(screen.getByText(/batman/i)).toBeInTheDocument()
  })

  it('both components use your hook instead of their own useState', () => {
    for (const src of [code(lightSource), code(spoilerSource)]) {
      expect(src).toMatch(/useToggle\s*\(/)
      expect(src).not.toMatch(/useState\s*[<(]/)
    }
  })
})
