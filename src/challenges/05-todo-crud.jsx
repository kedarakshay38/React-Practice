import { useState } from 'react'

// ===========================================================================
// CHALLENGE 5 — Todo list (add / toggle / delete)
// ===========================================================================
// The list renders from `todos` state and the input is controlled. Right now
// the Add button, checkbox and Delete button do nothing.
//
// TASKS:
//   1. Add a new todo from the input (ignore empty/whitespace), then clear it.
//   2. Toggle a todo's `done` flag via its checkbox.
//   3. Delete a todo via its Delete button.
//   4. Show "X of Y completed" count above the list.
// ===========================================================================

let nextId = 3

export function Component() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review pull request', done: true },
    { id: 2, text: 'Practice React interview', done: false },
  ])
  const [text, setText] = useState('')

  function addTodo() {
    // TODO: append a new todo { id, text, done:false } and clear the input.
    if(text){
      setTodos([...todos,{id:todos.length-1 ,text:text, done:false}]);
    }
  }

  function toggleTodo(id) {
    // TODO: flip `done` for the matching todo (immutably).
    
    setTodos(todos.map((todo)=>{
      if(todo.id===id)
      {
        todo.done=!todo.done;
        return todo;
      }
      return todo;
    }))
  }

  function deleteTodo(id) {
    // TODO: remove the matching todo.
    setTodos(todos.filter(
      (todo)=> todo.id===id
    ))
  }

  return (
    <div style={{ maxWidth: 460 }}>
      <div className="toolbar">
        <input
          placeholder="Add a task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button className="btn" onClick={addTodo}>Add</button>
      </div>
      {/* TODO: show "X of Y completed" */}
      <div>
        {todos.map((t) => (
          <div key={t.id} className={'todo-item' + (t.done ? ' done' : '')}>
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
            <span style={{ flex: 1 }}>{t.text}</span>
            <button className="btn danger" onClick={() => deleteTodo(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Solution() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Review pull request', done: true },
    { id: 2, text: 'Practice React interview', done: false },
  ])
  const [text, setText] = useState('')

  function addTodo() {
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((prev) => [...prev, { id: nextId++, text: trimmed, done: false }])
    setText('')
  }

  function toggleTodo(id) {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    )
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  const completed = todos.filter((t) => t.done).length

  return (
    <div style={{ maxWidth: 460 }}>
      <div className="toolbar">
        <input
          placeholder="Add a task…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button className="btn" onClick={addTodo}>Add</button>
      </div>
      <p className="pill">{completed} of {todos.length} completed</p>
      <div>
        {todos.map((t) => (
          <div key={t.id} className={'todo-item' + (t.done ? ' done' : '')}>
            <input type="checkbox" checked={t.done} onChange={() => toggleTodo(t.id)} />
            <span style={{ flex: 1 }}>{t.text}</span>
            <button className="btn danger" onClick={() => deleteTodo(t.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export const meta = {
  id: 'todo-crud',
  num: 5,
  title: 'Todo list (add / toggle / delete)',
  difficulty: 'easy',
  summary: 'Immutable state updates for a classic CRUD list.',
  tasks: [
    'Add a new todo from the input (ignore empty), then clear the input.',
    "Toggle a todo's done flag via its checkbox.",
    'Delete a todo via its Delete button.',
    'Show an "X of Y completed" count.',
  ],
  hint: 'Update arrays immutably: [...prev, item] to add, .map to toggle, .filter to delete. Use the functional setState form.',
}
