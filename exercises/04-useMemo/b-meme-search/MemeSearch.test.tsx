import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import MemeSearch from './MemeSearch'
import source from './MemeSearch.tsx?raw'
import { code } from '../../../tests/source'

const memes = ['Distracted boyfriend', 'Woman yelling at cat', 'Grumpy cat', 'This is fine dog', 'Drake']
const shown = () => Array.from(screen.getByTestId('results').children).map(li => li.textContent)

describe('04b useMemo: meme search', () => {
  it('shows everything before you type', () => {
    render(<MemeSearch memes={memes} />)
    expect(shown()).toHaveLength(5)
  })

  it('filters while you type', async () => {
    render(<MemeSearch memes={memes} />)
    await userEvent.type(screen.getByPlaceholderText('Search memes'), 'cat')
    expect(shown()).toEqual(['Woman yelling at cat', 'Grumpy cat'])
  })

  it('does not filter again when only dark mode changes', async () => {
    const onFilter = vi.fn()
    render(<MemeSearch memes={memes} onFilter={onFilter} />)
    await userEvent.type(screen.getByPlaceholderText('Search memes'), 'd')
    const calls = onFilter.mock.calls.length
    await userEvent.click(screen.getByRole('button', { name: /dark mode/i }))
    await userEvent.click(screen.getByRole('button', { name: /dark mode/i }))
    expect(onFilter).toHaveBeenCalledTimes(calls)
  })

  it('still uses useMemo', () => {
    expect(code(source)).toMatch(/useMemo\s*[<(]/)
  })
})
