import { useReducer } from 'react'

// ===========================================================================
// CHALLENGE 7 — Shopping cart with useReducer
// ===========================================================================
// The product list and cart layout are built. Manage cart state with a
// reducer. The `dispatch` calls are already wired to the buttons — you only
// need to implement the reducer logic.
//
// TASKS:
//   1. ADD: add a product to the cart. If it's already there, increment qty.
//   2. INCREMENT / DECREMENT: change an item's qty. Decrementing to 0 removes it.
//   3. REMOVE: remove an item entirely.
//   4. Show the running total price at the bottom.
// ===========================================================================

const PRODUCTS = [
  { id: 1, name: 'Coffee Mug', price: 12 },
  { id: 2, name: 'Notebook', price: 8 },
  { id: 3, name: 'Sticker Pack', price: 5 },
]

// Cart state shape: { items: [{ id, name, price, qty }] }
function reducer(state, action) {
  switch (action.type) {
    // TODO: handle 'ADD', 'INCREMENT', 'DECREMENT', 'REMOVE'
    default:
      return state
  }
}

export function Component() {
  const [state, dispatch] = useReducer(reducer, { items: [] })

  // TODO: compute the total price from state.items
  const total = 0

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <div>
        <h3>Products</h3>
        {PRODUCTS.map((p) => (
          <div key={p.id} className="todo-item">
            <span style={{ flex: 1 }}>{p.name} — ${p.price}</span>
            <button className="btn" onClick={() => dispatch({ type: 'ADD', product: p })}>
              Add
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>Cart</h3>
        {state.items.length === 0 && <p className="pill">Cart is empty</p>}
        {state.items.map((item) => (
          <div key={item.id} className="todo-item">
            <span style={{ flex: 1 }}>{item.name}</span>
            <button className="btn secondary" onClick={() => dispatch({ type: 'DECREMENT', id: item.id })}>−</button>
            <span>{item.qty}</span>
            <button className="btn secondary" onClick={() => dispatch({ type: 'INCREMENT', id: item.id })}>+</button>
            <button className="btn danger" onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>✕</button>
          </div>
        ))}
        <p style={{ marginTop: 16, fontWeight: 700 }}>Total: ${total}</p>
      </div>
    </div>
  )
}

function solutionReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((i) => i.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...action.product, qty: 1 }] }
    }
    case 'INCREMENT':
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: i.qty + 1 } : i
        ),
      }
    case 'DECREMENT':
      return {
        items: state.items
          .map((i) => (i.id === action.id ? { ...i, qty: i.qty - 1 } : i))
          .filter((i) => i.qty > 0),
      }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.id !== action.id) }
    default:
      return state
  }
}

export function Solution() {
  const [state, dispatch] = useReducer(solutionReducer, { items: [] })
  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
      <div>
        <h3>Products</h3>
        {PRODUCTS.map((p) => (
          <div key={p.id} className="todo-item">
            <span style={{ flex: 1 }}>{p.name} — ${p.price}</span>
            <button className="btn" onClick={() => dispatch({ type: 'ADD', product: p })}>
              Add
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>Cart</h3>
        {state.items.length === 0 && <p className="pill">Cart is empty</p>}
        {state.items.map((item) => (
          <div key={item.id} className="todo-item">
            <span style={{ flex: 1 }}>{item.name}</span>
            <button className="btn secondary" onClick={() => dispatch({ type: 'DECREMENT', id: item.id })}>−</button>
            <span>{item.qty}</span>
            <button className="btn secondary" onClick={() => dispatch({ type: 'INCREMENT', id: item.id })}>+</button>
            <button className="btn danger" onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>✕</button>
          </div>
        ))}
        <p style={{ marginTop: 16, fontWeight: 700 }}>Total: ${total}</p>
      </div>
    </div>
  )
}

export const meta = {
  id: 'usereducer-cart',
  num: 7,
  title: 'Shopping cart with useReducer',
  difficulty: 'medium',
  summary: 'Model add/increment/decrement/remove in a single reducer.',
  tasks: [
    'ADD a product (increment qty if already in the cart).',
    'INCREMENT / DECREMENT qty; decrementing to 0 removes the item.',
    'REMOVE an item entirely.',
    'Show the running total price.',
  ],
  hint: 'Keep the reducer pure — return new arrays/objects, never mutate state. For DECREMENT, map then filter out qty <= 0.',
}
