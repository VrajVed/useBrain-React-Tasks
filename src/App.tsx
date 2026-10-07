import { useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as ReactPointerEvent } from 'react'
import { marked } from 'marked'
import { hooks } from './exercises'
import ErrorBoundary from './ErrorBoundary'
import './App.css'

const SAVED = 'usebrain:active'
const SAVED_WIDTH = 'usebrain:sidebar'
const SAVED_HEIGHT = 'usebrain:topbar'
const WIDTH = { min: 200, max: 440, initial: 264 }
// Half-screen layout: the parts bar on top. Past `titles` there is room to show the part names.
const HEIGHT = { min: 96, titles: 200 }
const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(n)))
const saved = (key: string) => Number(localStorage.getItem(key)) || null

// Follows the pointer until it is released, even when it leaves the handle.
function drag(e: ReactPointerEvent<HTMLElement>, axis: 'col' | 'row', onMove: (ev: PointerEvent) => void) {
  e.preventDefault()
  const handle = e.currentTarget
  handle.setPointerCapture(e.pointerId)
  document.body.classList.add('resizing', axis)
  const stop = () => {
    handle.removeEventListener('pointermove', onMove)
    handle.removeEventListener('pointerup', stop)
    handle.removeEventListener('pointercancel', stop)
    document.body.classList.remove('resizing', axis)
  }
  handle.addEventListener('pointermove', onMove)
  handle.addEventListener('pointerup', stop)
  handle.addEventListener('pointercancel', stop)
}

const all = hooks.flatMap(h => h.parts.map(p => ({ hook: h, part: p, key: `${h.id}/${p.id}` })))

function App() {
  const [activeKey, setActiveKey] = useState(() => localStorage.getItem(SAVED) ?? all[0].key)
  const [tab, setTab] = useState<'task' | 'lesson'>('task')
  const [copied, setCopied] = useState(false)
  const [sidebarW, setSidebarW] = useState(() => clamp(saved(SAVED_WIDTH) ?? WIDTH.initial, WIDTH.min, WIDTH.max))
  // null means "as tall as the chips need".
  const [barH, setBarH] = useState(() => saved(SAVED_HEIGHT))
  const sidebarRef = useRef<HTMLElement>(null)
  const active = all.find(x => x.key === activeKey) ?? all[0]
  const num = active.hook.id.slice(0, 2)
  const letter = active.part.id[0]
  const cmd = `npm test -- ${active.hook.id}/${letter}`

  const html = useMemo(
    () => marked.parse(tab === 'task' ? active.part.task : active.hook.lesson, { async: false }) as string,
    [active, tab],
  )

  const open = (key: string) => {
    localStorage.setItem(SAVED, key)
    setActiveKey(key)
    setTab('task')
  }

  const copy = () => {
    navigator.clipboard?.writeText(cmd).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    })
  }

  const resizeWidth = (w: number) => {
    const next = clamp(w, WIDTH.min, WIDTH.max)
    setSidebarW(next)
    localStorage.setItem(SAVED_WIDTH, String(next))
  }

  const resizeHeight = (h: number | null) => {
    const next = h === null ? null : clamp(h, HEIGHT.min, window.innerHeight * 0.8)
    setBarH(next)
    if (next === null) localStorage.removeItem(SAVED_HEIGHT)
    else localStorage.setItem(SAVED_HEIGHT, String(next))
  }

  const currentHeight = () => barH ?? sidebarRef.current?.getBoundingClientRect().height ?? HEIGHT.min

  const nudgeWidth = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') resizeWidth(sidebarW - 16)
    if (e.key === 'ArrowRight') resizeWidth(sidebarW + 16)
  }

  const nudgeHeight = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp') resizeHeight(currentHeight() - 24)
    if (e.key === 'ArrowDown') resizeHeight(currentHeight() + 24)
  }

  const layout = {
    '--sidebar-w': `${sidebarW}px`,
    ...(barH !== null && { '--topbar-h': `${barH}px` }),
  } as CSSProperties

  return (
    <div className={barH !== null && barH >= HEIGHT.titles ? 'app roomy' : 'app'} style={layout}>
      <div
        className="resizer"
        role="separator"
        aria-orientation="vertical"
        aria-label="Resize sidebar"
        aria-valuenow={sidebarW}
        aria-valuemin={WIDTH.min}
        aria-valuemax={WIDTH.max}
        tabIndex={0}
        title="Drag to resize, double click to reset"
        onPointerDown={e => drag(e, 'col', ev => resizeWidth(ev.clientX))}
        onDoubleClick={() => resizeWidth(WIDTH.initial)}
        onKeyDown={nudgeWidth}
      />
      <aside className="sidebar" ref={sidebarRef}>
        <header className="brand">
          <h1>
            <span className="prompt">$</span> useBrain()
          </h1>
          <p className="tagline">Fix the component. Make the tests pass. Go in order.</p>
        </header>
        <nav>
          {hooks.map(h => (
            <div key={h.id} className="group">
              <div className="group-head">
                <span className="num">{h.id.slice(0, 2)}</span>
                <span className="hook">{h.hook}</span>
              </div>
              <div className="parts">
                {h.parts.map(p => {
                  const key = `${h.id}/${p.id}`
                  return (
                    <button
                      key={key}
                      className={key === active.key ? 'active' : ''}
                      aria-current={key === active.key ? 'page' : undefined}
                      onClick={() => open(key)}
                    >
                      <span className="letter">{p.id[0]}</span>
                      <span className="title">{p.title}</span>
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
        <div
          className="resizer-y"
          role="separator"
          aria-orientation="horizontal"
          aria-label="Resize parts bar"
          tabIndex={0}
          title="Drag to resize, double click to reset"
          onPointerDown={e => {
            const top = sidebarRef.current!.getBoundingClientRect().top
            drag(e, 'row', ev => resizeHeight(ev.clientY - top))
          }}
          onDoubleClick={() => resizeHeight(null)}
          onKeyDown={nudgeHeight}
        />
      </aside>

      <section className="lesson">
        <div className="pane-head">
          <span className="eyebrow">
            {num} · {active.hook.hook} · {letter}
          </span>
          <div className="segmented" role="tablist">
            <button role="tab" aria-selected={tab === 'task'} onClick={() => setTab('task')}>
              Task
            </button>
            <button role="tab" aria-selected={tab === 'lesson'} onClick={() => setTab('lesson')}>
              Lesson
            </button>
          </div>
        </div>
        {tab === 'task' && letter === 'a' && (
          <p className="new-hook">
            <span className="dot" />
            First part of a new hook. Read the{' '}
            <button className="link" onClick={() => setTab('lesson')}>
              lesson
            </button>{' '}
            before you start.
          </p>
        )}
        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </section>

      <main className="stage">
        <div className="pane-head">
          <span className="eyebrow live">
            <span className="pulse" />
            Live preview
          </span>
          <button className="cmd" onClick={copy} title="Copy command">
            <span className="prompt">$</span> {cmd}
            <span className="copy">{copied ? 'copied' : 'copy'}</span>
          </button>
        </div>
        <div className="preview">
          <div className="preview-bar">
            <span>
              Edit <code>exercises/{active.key}/</code>
            </span>
            <span className="muted">updates when you save</span>
          </div>
          <div className="canvas">
            <div className="component-box">
              <ErrorBoundary key={active.key}>{active.part.render()}</ErrorBoundary>
            </div>
          </div>
          <div className="preview-foot">
            Many parts print to the browser Console. Open it with <kbd>F12</kbd>.
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
