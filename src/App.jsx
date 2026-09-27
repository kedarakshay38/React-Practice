import { useState } from 'react'
import { NavLink, Route, Routes, useParams, Navigate, useNavigate } from 'react-router-dom'
import { challenges, getChallenge, DIFFICULTIES } from './challenges'

function Sidebar() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const visible = filter === 'all'
    ? challenges
    : challenges.filter((c) => c.difficulty === filter)

  function goRandom() {
    const pool = visible.length ? visible : challenges
    const pick = pool[Math.floor(Math.random() * pool.length)]
    navigate(`/challenge/${pick.id}`)
  }

  return (
    <aside className="sidebar">
      <h1>React Interview Practice</h1>
      <p className="subtitle">Complete the TODOs. Verify it works in the panel on the right.</p>

      <div className="toolbar" style={{ marginBottom: 12 }}>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All difficulties</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>{d[0].toUpperCase() + d.slice(1)}</option>
          ))}
        </select>
        <button className="btn" onClick={goRandom}>🎲 Random</button>
      </div>

      <NavLink to="/" end className="nav-item">
        <span className="title">🏠 Overview</span>
      </NavLink>
      {visible.map((c) => (
        <NavLink
          key={c.id}
          to={`/challenge/${c.id}`}
          className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
        >
          <span className="num">Challenge {c.num}</span>
          <span className="title">{c.title}</span>
          <span className={`badge ${c.difficulty}`}>{c.difficulty}</span>
        </NavLink>
      ))}
      {visible.length === 0 && <p className="pill">No challenges at this difficulty.</p>}
    </aside>
  )
}

function Home() {
  return (
    <div className="content-wrap">
      <h2>How this works</h2>
      <p>
        Each challenge mimics a live interview: you're handed half-finished code and asked to
        complete 2–4 tasks, then confirm the result in the UI. Aim for ~15 minutes each.
      </p>
      <ol>
        <li>Pick a challenge from the left (filter by difficulty or hit 🎲 Random).</li>
        <li>Open its file under <code>src/challenges/</code> and complete the <code>// TODO</code>s inside the exported <code>Component</code>.</li>
        <li>Save — the live preview on the right hot-reloads. Verify the behavior.</li>
        <li>Use <strong>Reset preview</strong> to clear state, or <strong>Show reference solution</strong> to compare.</li>
      </ol>
      <div className="home-grid">
        {challenges.map((c) => (
          <div key={c.id} className="home-card">
            <span className={`badge ${c.difficulty}`}>{c.difficulty}</span>
            <h3>{c.num}. {c.title}</h3>
            <p>{c.summary}</p>
            <NavLink className="btn" to={`/challenge/${c.id}`}>Start</NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

function ChallengeView() {
  const { id } = useParams()
  const challenge = getChallenge(id)
  const [showSolution, setShowSolution] = useState(false)
  const [resetKey, setResetKey] = useState(0)

  if (!challenge) return <Navigate to="/" replace />

  const { Component, Solution } = challenge

  return (
    <div className="content-wrap">
      <div className="task-card">
        <span className={`badge ${challenge.difficulty}`}>{challenge.difficulty}</span>
        <h2>Challenge {challenge.num}: {challenge.title}</h2>
        <p className="pill">
          Edit <code>src/challenges/{String(challenge.num).padStart(2, '0')}-{challenge.id}.jsx</code>
        </p>
        <strong>Your tasks:</strong>
        <ol>
          {challenge.tasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ol>
        <div className="hint">💡 {challenge.hint}</div>
      </div>

      <div className="toolbar">
        <h3 style={{ margin: 0 }}>Live preview</h3>
        <button className="btn secondary" onClick={() => setResetKey((k) => k + 1)}>
          ↺ Reset preview
        </button>
      </div>
      <div className="workspace">
        <Component key={resetKey} />
      </div>

      <div className="solution-toggle">
        <button className="btn secondary" onClick={() => setShowSolution((s) => !s)}>
          {showSolution ? 'Hide' : 'Show'} reference solution
        </button>
      </div>
      {showSolution && (
        <div className="solution-box">
          <p className="label">Reference solution (working)</p>
          <Solution key={`sol-${resetKey}`} />
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <div className="app">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenge/:id" element={<ChallengeView />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
