import { useState } from 'react'

export default function SliceParty() {
  const [slices, setSlices] = useState(0)

  const addOne = () => {
    setSlices(slices + 1)
  }

  // Three friends each grab a slice. Do not change this function, fix addOne.
  const threeFriends = () => {
    addOne()
    addOne()
    addOne()
  }

  return (
    <div>
      <h1 data-testid="slices">{slices}</h1>
      <button onClick={addOne}>+1</button>
      <button onClick={threeFriends}>+3 (three friends)</button>
    </div>
  )
}
