import { useEffect, useMemo, useState } from 'react'
import { fetchUsers } from '../services/api'

// ===========================================================================
// CHALLENGE 2 — Search + filter a table
// ===========================================================================
// The data already loads into `users`. The search box and role <select> are
// wired to state. Right now the table shows ALL users regardless of input.
//
// TASKS:
//   1. Filter by the search text — match against name OR email (case-insensitive).
//   2. Filter by the selected role (the "All" option means no role filter).
//   3. Show a "No results" row when nothing matches.
// ===========================================================================

export function Component() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('All')

  useEffect(() => {
    fetchUsers().then(setUsers)
  }, [])

  // TODO: derive `filtered` from users + search + role.
  //       (Prefer useMemo so it only recomputes when inputs change.)
  const filtered = users

  return (
    <div>
      <div className="toolbar">
        <input
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>All</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
        <span className="pill">{filtered.length} result(s)</span>
      </div>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.status}</td>
            </tr>
          ))}
          {/* TODO: if filtered is empty, show a single row saying "No results" */}
        </tbody>
      </table>
    </div>
  )
}

export function Solution() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('All')

  useEffect(() => {
    fetchUsers().then(setUsers)
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return users.filter((u) => {
      const matchesText =
        !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      const matchesRole = role === 'All' || u.role === role
      return matchesText && matchesRole
    })
  }, [users, search, role])

  return (
    <div>
      <div className="toolbar">
        <input
          placeholder="Search name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option>All</option>
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>
        <span className="pill">{filtered.length} result(s)</span>
      </div>
      <table>
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr>
        </thead>
        <tbody>
          {filtered.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.status}</td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan={4} className="status">No results</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export const meta = {
  id: 'filtering',
  num: 2,
  title: 'Search & filter a table',
  difficulty: 'easy',
  summary: 'Combine a text search and a role dropdown to filter rows.',
  tasks: [
    'Filter by search text against name OR email (case-insensitive).',
    'Filter by selected role ("All" means no role filter).',
    'Show a "No results" row when nothing matches.',
  ],
  hint: 'Derive the filtered list during render (useMemo) — do not store it in a second state. Combine both conditions with &&.',
}
