import { useState } from 'react'
import { exercises } from './exercises'
import './App.css'

function ExercisePreview({ exercise }: { exercise: (typeof exercises)[number] }) {
  const { Component } = exercise

  if (exercise.id === '04-useMemo') {
    return (
      <Component
        tickets={[7, 13, 42, 99]}
        findMagic={(tickets) => 'Magic: ' + tickets.join(', ')}
      />
    )
  }

  if (exercise.id === '05-useCallback') {
    return (
      <Component
        initialFriends={[
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
          { id: 3, name: 'Carol' },
        ]}
      />
    )
  }

  return <Component />
}

function App() {
  const [activeId, setActiveId] = useState(exercises[0].id)
  const active = exercises.find(e => e.id === activeId)!

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Hookslings</h1>
        <p className="tagline">Fix the component, make tests pass.</p>
        <nav>
          {exercises.map(ex => (
            <button
              key={ex.id}
              className={ex.id === activeId ? 'active' : ''}
              onClick={() => setActiveId(ex.id)}
            >
              {ex.title}
            </button>
          ))}
        </nav>
      </aside>
      <main className="stage">
        <h2>{active.title}</h2>
        <div className="component-box">
          <ExercisePreview exercise={active} />
        </div>
      </main>
    </div>
  )
}

export default App
