import { useState } from 'react'
import { saveFavorite } from '../services/api'

// ===========================================================================
// CHALLENGE 9 — Optimistic UI update with rollback
// ===========================================================================
// Toggling a "★ favorite" calls saveFavorite(id, value), which takes ~600ms
// and FAILS ~35% of the time. For a snappy UI, update immediately and roll
// back only if the request fails.
//
// TASKS:
//   1. On toggle, update the item's `favorite` in state IMMEDIATELY (optimistic).
//   2. Call saveFavorite. If it rejects, revert that item and show an error.
//   3. Disable the button for that item while its request is in flight.
// ===========================================================================

const INITIAL = [
  { id: 1, name: 'Sunset Poster', favorite: false },
  { id: 2, name: 'Mountain Print', favorite: true },
  { id: 3, name: 'Ocean Canvas', favorite: false },
]

export function Component() {
  const [items, setItems] = useState(INITIAL)
  const [error, setError] = useState(null)

  async function toggleFavorite(id) {
    // TODO 1: optimistically flip favorite in state.
    // TODO 3: mark this id as "saving".
    // TODO 2: await saveFavorite(id, newValue); on error, revert + setError.
  }

  return (
    <div style={{ maxWidth: 460 }}>
      {error && <p className="field-error">{error}</p>}
      {items.map((it) => (
        <div key={it.id} className="todo-item">
          <span style={{ flex: 1 }}>{it.name}</span>
          <button className="btn secondary" onClick={() => toggleFavorite(it.id)}>
            {it.favorite ? '★ Favorited' : '☆ Favorite'}
          </button>
        </div>
      ))}
    </div>
  )
}

export function Solution() {
  const [items, setItems] = useState(INITIAL)
  const [savingId, setSavingId] = useState(null)
  const [error, setError] = useState(null)

  async function toggleFavorite(id) {
    const current = items.find((i) => i.id === id)
    const newValue = !current.favorite

    setError(null)
    setSavingId(id)
    // optimistic update
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, favorite: newValue } : i))
    )

    try {
      await saveFavorite(id, newValue)
    } catch (err) {
      // rollback
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, favorite: current.favorite } : i))
      )
      setError(err.message)
    } finally {
      setSavingId(null)
    }
  }

  return (
    <div style={{ maxWidth: 460 }}>
      {error && <p className="field-error">{error}</p>}
      {items.map((it) => (
        <div key={it.id} className="todo-item">
          <span style={{ flex: 1 }}>{it.name}</span>
          <button
            className="btn secondary"
            onClick={() => toggleFavorite(it.id)}
            disabled={savingId === it.id}
          >
            {savingId === it.id ? 'Saving…' : it.favorite ? '★ Favorited' : '☆ Favorite'}
          </button>
        </div>
      ))}
    </div>
  )
}

export const meta = {
  id: 'optimistic-update',
  num: 9,
  title: 'Optimistic update with rollback',
  difficulty: 'hard',
  summary: 'Update the UI immediately, then revert if the API call fails.',
  tasks: [
    'On toggle, flip favorite in state immediately (optimistic).',
    'Call saveFavorite; on rejection, revert that item and show an error.',
    'Disable the button for the item while its request is in flight.',
  ],
  hint: 'Capture the previous value before updating so you can restore it in catch. Track an in-flight id in state to disable the right button. saveFavorite fails ~35% of the time — keep clicking to see rollback.',
}
