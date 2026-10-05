import { useMemo, useState } from 'react'
import { marked } from 'marked'
import { exercises } from './exercises'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

const SAVED = 'hookslings:active'

function App() {
  const [activeId, setActiveId] = useState(() => localStorage.getItem(SAVED) ?? exercises[0].id)
  const active = exercises.find(e => e.id === activeId) ?? exercises[0]
  const lesson = useMemo(() => marked.parse(active.readme, { async: false }) as string, [active])

  const open = (id: string) => {
    localStorage.setItem(SAVED, id)
    setActiveId(id)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>Hookslings</h1>
        <p className="tagline">Fix the component. Make the tests pass. Go in order.</p>
        <nav>
          {exercises.map(ex => (
            <button key={ex.id} className={ex.id === active.id ? 'active' : ''} onClick={() => open(ex.id)}>
              <span className="num">{ex.id.slice(0, 2)}</span>
              <span>
                <code>{ex.hook}</code>
                <small>{ex.title}</small>
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <section className="lesson" dangerouslySetInnerHTML={{ __html: lesson }} />

      <main className="stage">
        <div className="stage-head">
          <h2>Live preview</h2>
          <code className="cmd">npm test -- {active.id}</code>
        </div>
        <div className="component-box">
          <ErrorBoundary key={active.id}>{active.render()}</ErrorBoundary>
        </div>
        <p className="hint">
          Edit <code>exercises/{active.id}/</code> and save. This updates on its own.
        </p>
      </main>
    </div>
  )
}

export default App
