import { useState } from 'react'

const TOPPING_PRICE = 30

export default function PizzaBuilder() {
  const [toppings, setToppings] = useState<string[]>([])

  const addTopping = (topping: string) => {
    setToppings([...toppings, topping])
  }

  const removeTopping = (topping: string) => {
    setToppings(toppings.filter(t => t !== topping))
  }

  const total = 100 + toppings.length * TOPPING_PRICE

  return (
    <div>
      <p data-testid="total">Total: {total}</p>
      <button onClick={() => addTopping('cheese')}>Add cheese</button>
      <button onClick={() => addTopping('mushroom')}>Add mushroom</button>
      <button onClick={() => removeTopping('cheese')}>Remove cheese</button>
      <ul data-testid="toppings">
        {toppings.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
    </div>
  )
}
