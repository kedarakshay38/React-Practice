# React Interview Practice

Timed, interview-style React challenges. You're handed half-finished code with
`// TODO` markers and complete 2–4 tasks, then verify the result live in the UI —
just like a real 15-minute pairing round.

## Run it

```bash
npm install
npm run dev
```

Open the printed URL (default http://localhost:5173).

## How to practice

1. Pick a challenge in the left sidebar.
2. Open its file under `src/challenges/` and complete the `// TODO`s **inside the
   exported `Component`** (the `Solution` export is the answer key — don't peek yet).
3. Save. Vite hot-reloads the live preview on the right. Verify the behaviour.
4. Use **Show reference solution** to compare when you're done or stuck.

## Challenges

| # | Title | Difficulty | Skills |
|---|-------|-----------|--------|
| 1 | Fetch data into a table | easy | useEffect, async/await, loading + error states |
| 2 | Search & filter a table | easy | derived state, useMemo, controlled inputs |
| 3 | Sortable columns + pagination | medium | immutable sort, toggling, slicing pages |
| 4 | Controlled form validation | medium | forms, validation, conditional rendering |
| 5 | Todo list (add/toggle/delete) | easy | immutable array updates |
| 6 | Debounced server-side search | hard | custom hooks, cleanup, stale-response guard |
| 7 | Shopping cart with useReducer | medium | reducers, pure updates, derived total |
| 8 | Theme switcher with Context | medium | createContext, Provider, useContext |
| 9 | Optimistic update with rollback | hard | optimistic UI, error rollback, in-flight state |
| 10 | Modal with a Portal | hard | createPortal, event propagation, Escape/cleanup |

Use the **difficulty filter** and **🎲 Random** button in the sidebar to pick a challenge.

## Reset a challenge

- **Reset preview** (button above the live preview) remounts the component to
  clear its runtime state — handy for re-testing from a clean slate.
- Each challenge file keeps the `Solution` export untouched, so you can always
  compare. To fully redo the code, re-clear the `// TODO` regions of its `Component`.

## Tips for the real interview

- Read the whole file first — the wiring (state, handlers) is often already there.
- Talk through your plan before typing.
- Keep derived data (filtered/sorted lists) computed during render, not in extra state.
- Update state immutably; use the functional `setState(prev => …)` form.
- Verify in the UI after each task instead of writing everything then testing.
