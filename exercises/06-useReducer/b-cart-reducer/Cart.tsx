import { useReducer } from 'react'
import { cartReducer, initialCart } from './cartReducer'

export default function Cart() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0)

  return (
    <div>
      <h3>Canteen order</h3>
      <ul>
        {cart.items.map(item => (
          <li key={item.id}>
            {item.name} (₹{item.price})
            <button aria-label={`Remove ${item.name}`} onClick={() => dispatch({ type: 'decrement', id: item.id })}>
              -
            </button>
            <span data-testid={`qty-${item.id}`}>{item.qty}</span>
            <button aria-label={`Add ${item.name}`} onClick={() => dispatch({ type: 'increment', id: item.id })}>
              +
            </button>
          </li>
        ))}
      </ul>
      <p data-testid="total">Total: ₹{total}</p>
      <button onClick={() => dispatch({ type: 'clear' })}>Clear order</button>
    </div>
  )
}
