import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import SearchBox from './SearchBox'
import source from './SearchBox.tsx?raw'
import { code } from '../../../tests/source'

describe('03a useRef: focus the search box', () => {
  it('focuses the input as soon as it appears', () => {
    render(<SearchBox />)
    expect(screen.getByPlaceholderText('Search memes')).toHaveFocus()
  })

  it('focuses the input again when the button is clicked', async () => {
    render(<SearchBox />)
    const input = screen.getByPlaceholderText('Search memes')
    input.blur()
    expect(input).not.toHaveFocus()
    await userEvent.click(screen.getByRole('button', { name: /focus search/i }))
    expect(input).toHaveFocus()
  })

  it('uses useRef, not document.querySelector', () => {
    const src = code(source)
    expect(src).toMatch(/useRef\s*[<(]/)
    expect(src).not.toMatch(/querySelector|getElementById|getElementsBy/)
  })
})
