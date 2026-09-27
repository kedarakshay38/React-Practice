import { useState } from 'react'

// ===========================================================================
// CHALLENGE 4 — Controlled form with validation
// ===========================================================================
// A sign-up form with name / email / password fields. Inputs are already
// controlled. Right now submit always "succeeds" with no validation.
//
// TASKS:
//   1. Validate on submit:
//        - name: required
//        - email: required + must contain "@"
//        - password: required + at least 6 characters
//   2. Show the error message under each invalid field, and do NOT submit
//      when there are errors.
//   3. On a valid submit, show a success message with the submitted name.
// ===========================================================================

const EMPTY = { name: '', email: '', password: '' }

export function Component() {
  const [form, setForm] = useState(EMPTY)
  // TODO: add state for `errors` and `submitted`.

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    // TODO: build an errors object; if empty, mark submitted, else set errors.
    alert('submitted (no validation yet)')
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 380 }}>
      <div className="field">
        <label>Name</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} />
        {/* TODO: {errors.name && <div className="field-error">{errors.name}</div>} */}
      </div>
      <div className="field">
        <label>Email</label>
        <input value={form.email} onChange={(e) => update('email', e.target.value)} />
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
        />
      </div>
      <button className="btn" type="submit">Sign up</button>
      {/* TODO: show success message when submitted */}
    </form>
  )
}

export function Solution() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function validate(values) {
    const next = {}
    if (!values.name.trim()) next.name = 'Name is required'
    if (!values.email.trim()) next.email = 'Email is required'
    else if (!values.email.includes('@')) next.email = 'Email must contain @'
    if (!values.password) next.password = 'Password is required'
    else if (values.password.length < 6) next.password = 'Min 6 characters'
    return next
  }

  function handleSubmit(e) {
    e.preventDefault()
    const next = validate(form)
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSubmitted(true)
    } else {
      setSubmitted(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 380 }}>
      <div className="field">
        <label>Name</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} />
        {errors.name && <div className="field-error">{errors.name}</div>}
      </div>
      <div className="field">
        <label>Email</label>
        <input value={form.email} onChange={(e) => update('email', e.target.value)} />
        {errors.email && <div className="field-error">{errors.email}</div>}
      </div>
      <div className="field">
        <label>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={(e) => update('password', e.target.value)}
        />
        {errors.password && <div className="field-error">{errors.password}</div>}
      </div>
      <button className="btn" type="submit">Sign up</button>
      {submitted && (
        <p style={{ color: 'var(--accent-2)' }}>Welcome, {form.name}! Account created.</p>
      )}
    </form>
  )
}

export const meta = {
  id: 'form-validation',
  num: 4,
  title: 'Controlled form validation',
  difficulty: 'medium',
  summary: 'Validate fields on submit and block invalid submissions.',
  tasks: [
    'Validate name (required), email (required + contains @), password (required + ≥6 chars).',
    'Show per-field error messages and block submit when invalid.',
    'Show a success message with the name on a valid submit.',
  ],
  hint: 'Build a plain errors object in a validate() function, then setErrors. Only submit when Object.keys(errors).length === 0.',
}
