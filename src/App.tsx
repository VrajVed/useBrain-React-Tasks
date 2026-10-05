import { useMemo, useState } from 'react'
import { marked } from 'marked'
import { hooks } from './exercises'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

const SAVED = 'usebrain:active'
const all = hooks.flatMap(h => h.parts.map(p => ({ hook: h, part: p, key: `${h.id}/${p.id}` })))

function App() {
  const [activeKey, setActiveKey] = useState(() => localStorage.getItem(SAVED) ?? all[0].key)
  const [tab, setTab] = useState<'task' | 'lesson'>('task')
  const active = all.find(x => x.key === activeKey) ?? all[0]
  const shortKey = `${active.hook.id}/${active.part.id[0]}`

  const html = useMemo(
    () => marked.parse(tab === 'task' ? active.part.task : active.hook.lesson, { async: false }) as string,
    [active, tab],
  )

  const open = (key: string) => {
    localStorage.setItem(SAVED, key)
    setActiveKey(key)
    setTab('task')
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <h1>useBrain()</h1>
        <p className="tagline">Fix the component. Make the tests pass. Go in order.</p>
        <nav>
          {hooks.map(h => (
            <div key={h.id} className="group">
              <div className="group-head">
                <span className="num">{h.id.slice(0, 2)}</span>
                <code>{h.hook}</code>
              </div>
              {h.parts.map(p => {
                const key = `${h.id}/${p.id}`
                return (
                  <button key={key} className={key === active.key ? 'active' : ''} onClick={() => open(key)}>
                    <span className="letter">{p.id[0]}</span>
                    <span className="title">{p.title}</span>
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      <section className="lesson">
        <div className="tabs">
          <button className={tab === 'task' ? 'on' : ''} onClick={() => setTab('task')}>
            Task {active.hook.id.slice(0, 2)} {active.part.id[0]}
          </button>
          <button className={tab === 'lesson' ? 'on' : ''} onClick={() => setTab('lesson')}>
            Lesson: {active.hook.hook}
          </button>
        </div>
        {tab === 'task' && active.part.id.startsWith('a') && (
          <p className="new-hook">
            New hook! Read the <a onClick={() => setTab('lesson')}>Lesson</a> first.
          </p>
        )}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>

      <main className="stage">
        <div className="stage-head">
          <h2>Live preview</h2>
          <code className="cmd">npm test -- {shortKey}</code>
        </div>
        <div className="component-box">
          <ErrorBoundary key={active.key}>{active.part.render()}</ErrorBoundary>
        </div>
        <p className="hint">
          Edit <code>exercises/{active.key}/</code> and save. This updates on its own. Many parts print to the
          browser Console (F12).
        </p>
      </main>
    </div>
  )
}

export default App
