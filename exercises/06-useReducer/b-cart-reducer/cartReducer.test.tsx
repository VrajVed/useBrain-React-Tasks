import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Cart from './Cart'
import { cartReducer, type CartState } from './cartReducer'

// Frozen objects throw an error if anything tries to change them.
function frozen(qty: Record<string, number> = {}): CartState {
  const items = [
    { id: 'samosa', name: 'Samosa', price: 20, qty: qty.samosa ?? 0 },
    { id: 'chai', name: 'Chai', price: 15, qty: qty.chai ?? 0 },
  ].map(i => Object.freeze(i))
  return Object.freeze({ items: Object.freeze(items) }) as CartState
}
const qty = (s: CartState, id: string) => s.items.find(i => i.id === id)!.qty

describe('06b useReducer: cart reducer', () => {
  it('increment returns a NEW state with one more', () => {
    const before = frozen()
    const after = cartReducer(before, { type: 'increment', id: 'samosa' })
    expect(after).not.toBe(before)
    expect(qty(after, 'samosa')).toBe(1)
    expect(qty(before, 'samosa'), 'do not change the old state').toBe(0)
  })

  it('decrement returns a NEW state with one less', () => {
    const after = cartReducer(frozen({ chai: 2 }), { type: 'decrement', id: 'chai' })
    expect(qty(after, 'chai')).toBe(1)
  })

  it('never goes below zero', () => {
    const after = cartReducer(frozen(), { type: 'decrement', id: 'chai' })
    expect(qty(after, 'chai')).toBe(0)
  })

  it('only changes the item it was asked to', () => {
    const after = cartReducer(frozen({ chai: 3 }), { type: 'increment', id: 'samosa' })
    expect(qty(after, 'chai')).toBe(3)
  })

  it('the cart updates on screen', async () => {
    render(<Cart />)
    await userEvent.click(screen.getByRole('button', { name: 'Add Samosa' }))
    await userEvent.click(screen.getByRole('button', { name: 'Add Samosa' }))
    await userEvent.click(screen.getByRole('button', { name: 'Add Chai' }))
    await userEvent.click(screen.getByRole('button', { name: 'Remove Vada pav' }))
    expect(screen.getByTestId('qty-samosa')).toHaveTextContent('2')
    expect(screen.getByTestId('qty-vadapav')).toHaveTextContent('0')
    expect(screen.getByTestId('total')).toHaveTextContent('Total: ₹55')
  })
})
