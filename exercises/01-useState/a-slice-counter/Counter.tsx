import { useState } from 'react'

export default function Counter() {
  let count = 0

  const add = () => {
    count += 1
  }

  const remove = () => {
    count -= 1
  }

  return (
    <div>
      <h1 data-testid="count">{count}</h1>
      <button onClick={add}>+</button>
      <button onClick={remove}>-</button>
    </div>
  )
}
