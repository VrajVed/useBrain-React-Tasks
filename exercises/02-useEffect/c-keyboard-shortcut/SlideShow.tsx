import { useEffect, useState } from 'react'

const slides = ['🍕', '🌮', '🍜', '🍩', '🥤']

export default function SlideShow() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % slides.length)
    }
    window.addEventListener('keydown', onKey)
  })

  return (
    <div>
      <div style={{ fontSize: 72 }}>{slides[index]}</div>
      <p data-testid="position">
        Slide {index + 1} of {slides.length}
      </p>
      <p>Press the right arrow key.</p>
    </div>
  )
}
