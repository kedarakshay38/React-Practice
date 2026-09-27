import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

// ===========================================================================
// CHALLENGE 10 — Accessible modal with a Portal
// ===========================================================================
// Build a reusable <Modal> that renders into document.body via a portal (so it
// escapes any parent overflow/stacking). The open/close state is already here.
//
// TASKS:
//   1. Render the modal content through a portal into document.body when `open`.
//   2. Close it when clicking the dark backdrop (but NOT when clicking inside
//      the modal box).
//   3. Close it when the Escape key is pressed.
// ===========================================================================

const backdropStyle = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
  display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
}
const boxStyle = {
  background: '#1e293b', border: '1px solid #334155', borderRadius: 12,
  padding: 24, minWidth: 320, maxWidth: 420,
}

function Modal({ open, onClose, children }) {
  // TODO 3: add a keydown listener for Escape while open (clean it up!).

  if (!open) return null

  // TODO 1 + 2: return createPortal(<backdrop onClick={onClose}> with an inner
  //             box that stops click propagation, ...>, document.body)
  return (
    <div style={backdropStyle}>
      <div style={boxStyle}>{children}</div>
    </div>
  )
}

export function Component() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button className="btn" onClick={() => setOpen(true)}>Open modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h3>Confirm action</h3>
        <p>Click the backdrop or press Escape to close.</p>
        <button className="btn secondary" onClick={() => setOpen(false)}>Close</button>
      </Modal>
    </div>
  )
}

function SolutionModal({ open, onClose, children }) {
  useEffect(() => {
    if (!open) return
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div style={backdropStyle} onClick={onClose}>
      <div style={boxStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export function Solution() {
  const [open, setOpen] = useState(false)
  return (
    <div>
      <button className="btn" onClick={() => setOpen(true)}>Open modal</button>
      <SolutionModal open={open} onClose={() => setOpen(false)}>
        <h3>Confirm action</h3>
        <p>Click the backdrop or press Escape to close.</p>
        <button className="btn secondary" onClick={() => setOpen(false)}>Close</button>
      </SolutionModal>
    </div>
  )
}

export const meta = {
  id: 'modal-portal',
  num: 10,
  title: 'Modal with a Portal',
  difficulty: 'hard',
  summary: 'Render via createPortal, close on backdrop click + Escape.',
  tasks: [
    'Render the modal into document.body with createPortal when open.',
    'Close on backdrop click, but not when clicking inside the box (stopPropagation).',
    'Close on the Escape key (add + remove the listener in an effect).',
  ],
  hint: 'createPortal(node, document.body). Put onClick={onClose} on the backdrop and e.stopPropagation() on the inner box. Register the Escape listener in useEffect and return a cleanup that removes it.',
}
