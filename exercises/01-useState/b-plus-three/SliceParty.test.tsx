import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import SliceParty from './SliceParty'
import source from './SliceParty.tsx?raw'
import { code } from '../../../tests/source'

const slices = () => screen.getByTestId('slices').textContent

describe('01b useState: slice party', () => {
  it('+1 adds one slice', async () => {
    render(<SliceParty />)
    await userEvent.click(screen.getByRole('button', { name: '+1' }))
    expect(slices()).toBe('1')
  })

  it('three friends add three slices', async () => {
    render(<SliceParty />)
    await userEvent.click(screen.getByRole('button', { name: /three friends/i }))
    expect(slices()).toBe('3')
  })

  it('keeps counting correctly after mixing buttons', async () => {
    render(<SliceParty />)
    await userEvent.click(screen.getByRole('button', { name: '+1' }))
    await userEvent.click(screen.getByRole('button', { name: /three friends/i }))
    await userEvent.click(screen.getByRole('button', { name: /three friends/i }))
    expect(slices()).toBe('7')
  })

  it('threeFriends still calls addOne three times', () => {
    expect(code(source)).toMatch(/addOne\(\)\s*addOne\(\)\s*addOne\(\)/)
  })

  it('addOne uses the updater form of the setter', () => {
    expect(code(source), 'pass a function to setSlices, like setSlices(previous => ...)').toMatch(/setSlices\(\s*\(?\s*\w+\s*\)?\s*=>/)
  })
})
