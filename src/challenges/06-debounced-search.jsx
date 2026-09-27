import { useEffect, useState } from 'react'
import { searchUsers } from '../services/api'

// ===========================================================================
// CHALLENGE 6 — Debounced server-side search (custom hook)
// ===========================================================================
// `searchUsers(query)` hits the "server" (~500ms) and returns matching users.
// Calling it on every keystroke is wasteful. You'll debounce the input so the
// request only fires after the user stops typing for 400ms.
//
// TASKS:
//   1. Implement the useDebounce(value, delay) hook so it returns `value` only
//      after it has stopped changing for `delay` ms (clear the timer on change).
//   2. In the component, call searchUsers ONLY when the debounced value changes.
//   3. Show "Searching…" while a request is in flight.
// ===========================================================================

// TODO: implement this hook.
function useDebounce(value, delay) {
  // return the debounced value
  return value
}

export function Component() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounced = useDebounce(query, 400)

  useEffect(() => {
    // TODO: call searchUsers(debounced), toggle loading, store results.
    // (Bonus: ignore stale responses if a newer one comes back first.)
  }, [debounced])

  return (
    <div>
      <div className="toolbar">
        <input
          placeholder="Search users (server-side)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <span className="pill">Searching…</span>}
      </div>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {results.map((u) => (
            <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function useDebounceSolution(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}

export function Solution() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const debounced = useDebounceSolution(query, 400)

  useEffect(() => {
    let active = true
    setLoading(true)
    searchUsers(debounced)
      .then((data) => {
        if (active) setResults(data)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [debounced])

  return (
    <div>
      <div className="toolbar">
        <input
          placeholder="Search users (server-side)…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {loading && <span className="pill">Searching…</span>}
      </div>
      <table>
        <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
        <tbody>
          {results.map((u) => (
            <tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const meta = {
  id: 'debounced-search',
  num: 6,
  title: 'Debounced server-side search',
  difficulty: 'hard',
  summary: 'Write a useDebounce hook and avoid a request per keystroke.',
  tasks: [
    'Implement useDebounce(value, delay) — returns value after it settles for delay ms.',
    'Call searchUsers only when the debounced value changes.',
    'Show "Searching…" while a request is in flight.',
  ],
  hint: 'In useDebounce, setTimeout to update the debounced value and clearTimeout in the effect cleanup. Use an `active` flag in the fetch effect to drop stale responses.',
}
