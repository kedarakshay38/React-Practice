import { createContext, useContext, useState } from 'react'

// ===========================================================================
// CHALLENGE 8 — Theme switcher with Context
// ===========================================================================
// A deeply nested "Card" needs the current theme without prop-drilling.
// Use React Context to provide the theme at the top and consume it below.
//
// TASKS:
//   1. Create a ThemeContext and wrap the tree in its Provider, supplying
//      { theme, toggleTheme }.
//   2. In <Toolbar />, read toggleTheme from context and wire the button.
//   3. In <Card /> (nested, no props), read `theme` from context and apply it.
// ===========================================================================

// TODO 1a: create the context
// const ThemeContext = createContext(...)

function Toolbar() {
  // TODO 2: const { toggleTheme } = useContext(ThemeContext)
  return (
    <button className="btn" onClick={() => {}}>
      Toggle theme
    </button>
  )
}

function Card() {
  // TODO 3: const { theme } = useContext(ThemeContext)
  const theme = 'light' // <- replace with context value
  const styles =
    theme === 'dark'
      ? { background: '#0b1120', color: '#e2e8f0', border: '1px solid #334155' }
      : { background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1' }
  return (
    <div style={{ ...styles, padding: 20, borderRadius: 12, marginTop: 16 }}>
      <strong>Nested Card</strong>
      <p>Current theme: {theme}</p>
    </div>
  )
}

export function Component() {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  // TODO 1b: wrap the returned tree in <ThemeContext.Provider value={{ theme, toggleTheme }}>
  return (
    <div>
      <Toolbar />
      <Card />
    </div>
  )
}

const ThemeContext = createContext(null)

function SolutionToolbar() {
  const { toggleTheme } = useContext(ThemeContext)
  return (
    <button className="btn" onClick={toggleTheme}>
      Toggle theme
    </button>
  )
}

function SolutionCard() {
  const { theme } = useContext(ThemeContext)
  const styles =
    theme === 'dark'
      ? { background: '#0b1120', color: '#e2e8f0', border: '1px solid #334155' }
      : { background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1' }
  return (
    <div style={{ ...styles, padding: 20, borderRadius: 12, marginTop: 16 }}>
      <strong>Nested Card</strong>
      <p>Current theme: {theme}</p>
    </div>
  )
}

export function Solution() {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <SolutionToolbar />
      <SolutionCard />
    </ThemeContext.Provider>
  )
}

export const meta = {
  id: 'usecontext-theme',
  num: 8,
  title: 'Theme switcher with Context',
  difficulty: 'medium',
  summary: 'Avoid prop-drilling by providing/consuming a theme via Context.',
  tasks: [
    'Create a ThemeContext and provide { theme, toggleTheme } at the top.',
    'Read toggleTheme from context in the Toolbar button.',
    'Read theme from context in the nested Card (no props).',
  ],
  hint: 'createContext() at module scope, wrap the tree in <Ctx.Provider value={...}>, and read with useContext(Ctx) in any descendant — no props needed.',
}
