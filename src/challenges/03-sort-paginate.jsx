import { useEffect, useMemo, useState } from 'react'
import { fetchUsers } from '../services/api'

// ===========================================================================
// CHALLENGE 3 — Sortable columns + pagination
// ===========================================================================
// Data loads into `users`. Column headers are clickable (onClick wired), and
// there is a page size of 5. Right now clicking headers does nothing and all
// rows show on one page.
//
// TASKS:
//   1. Clicking a header sorts by that column. Clicking the same header again
//      toggles ascending <-> descending. Handle both strings and numbers.
//   2. Show an ▲ / ▼ arrow next to the active sort column.
//   3. Paginate the (sorted) rows — 5 per page — with Prev / Next buttons that
//      disable at the ends, and a "Page X of Y" label.
// ===========================================================================

const PAGE_SIZE = 5
const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'age', label: 'Age' },
]

export function Component() {
  const [users, setUsers] = useState([])
  // TODO: add state for sortKey, sortDir ('asc'|'desc') and page.
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchUsers().then(setUsers)
  }, [])

  function handleSort(key) {
    // TODO: set sort key / toggle direction, and reset to page 1.
  }

  // TODO: produce `sorted` (a sorted copy of users) then `pageRows` (the slice
  //       for the current page). Remember not to mutate `users` with .sort().
  const pageRows = users.slice(0, PAGE_SIZE)
  const totalPages = Math.max(1, Math.ceil(users.length / PAGE_SIZE))

  return (
    <div>
      <table>
        <thead>
          <tr>
            {COLUMNS.map((c) => (
              <th key={c.key} className="sortable" onClick={() => handleSort(c.key)}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td><td>{u.role}</td><td>{u.status}</td><td>{u.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pager">
        <button className="btn secondary" onClick={() => setPage((p) => p - 1)}>Prev</button>
        <span className="pill">Page {page} of {totalPages}</span>
        <button className="btn secondary" onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  )
}

export function Solution() {
  const [users, setUsers] = useState([])
  const [sortKey, setSortKey] = useState(null)
  const [sortDir, setSortDir] = useState('asc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchUsers().then(setUsers)
  }, [])

  function handleSort(key) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  const sorted = useMemo(() => {
    if (!sortKey) return users
    const copy = [...users]
    copy.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      let cmp
      if (typeof av === 'number' && typeof bv === 'number') {
        cmp = av - bv
      } else {
        cmp = String(av).localeCompare(String(bv))
      }
      return sortDir === 'asc' ? cmp : -cmp
    })
    return copy
  }, [users, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE))
  const pageRows = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div>
      <table>
        <thead>
          <tr>
            {COLUMNS.map((c) => (
              <th key={c.key} className="sortable" onClick={() => handleSort(c.key)}>
                {c.label}
                {sortKey === c.key && (sortDir === 'asc' ? ' ▲' : ' ▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageRows.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td><td>{u.role}</td><td>{u.status}</td><td>{u.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pager">
        <button
          className="btn secondary"
          onClick={() => setPage((p) => p - 1)}
          disabled={page <= 1}
        >
          Prev
        </button>
        <span className="pill">Page {page} of {totalPages}</span>
        <button
          className="btn secondary"
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export const meta = {
  id: 'sort-paginate',
  num: 3,
  title: 'Sortable columns + pagination',
  difficulty: 'medium',
  summary: 'Toggle sort direction per column and page through results.',
  tasks: [
    'Clicking a header sorts by it; clicking again toggles asc/desc (strings + numbers).',
    'Show a ▲ / ▼ indicator on the active sort column.',
    'Paginate 5 rows per page with Prev/Next that disable at the ends.',
  ],
  hint: 'Never .sort() state directly — sort a copy ([...users]). Use localeCompare for strings and subtraction for numbers. Reset to page 1 when the sort changes.',
}
