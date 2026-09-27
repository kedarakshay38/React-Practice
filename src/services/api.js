// ---------------------------------------------------------------------------
// Mock backend service.
// These simulate real network calls with latency + occasional errors.
// You do NOT need to change this file for most challenges — treat it like a
// real API you consume from your components.
// ---------------------------------------------------------------------------

const USERS = [
  { id: 1, name: 'Aisha Khan', email: 'aisha@corp.io', role: 'Admin', status: 'Active', age: 34 },
  { id: 2, name: 'Bob Martinez', email: 'bob@corp.io', role: 'Editor', status: 'Active', age: 28 },
  { id: 3, name: 'Chen Wei', email: 'chen@corp.io', role: 'Viewer', status: 'Inactive', age: 41 },
  { id: 4, name: 'Diana Novak', email: 'diana@corp.io', role: 'Editor', status: 'Active', age: 25 },
  { id: 5, name: 'Ethan Brooks', email: 'ethan@corp.io', role: 'Admin', status: 'Inactive', age: 39 },
  { id: 6, name: 'Fatima Ali', email: 'fatima@corp.io', role: 'Viewer', status: 'Active', age: 30 },
  { id: 7, name: 'George Papas', email: 'george@corp.io', role: 'Editor', status: 'Active', age: 47 },
  { id: 8, name: 'Hana Sato', email: 'hana@corp.io', role: 'Viewer', status: 'Inactive', age: 22 },
  { id: 9, name: 'Ivan Petrov', email: 'ivan@corp.io', role: 'Admin', status: 'Active', age: 36 },
  { id: 10, name: 'Julia Rossi', email: 'julia@corp.io', role: 'Editor', status: 'Active', age: 33 },
  { id: 11, name: 'Karim Nasser', email: 'karim@corp.io', role: 'Viewer', status: 'Active', age: 29 },
  { id: 12, name: 'Lena Fischer', email: 'lena@corp.io', role: 'Admin', status: 'Inactive', age: 44 },
]

const PRODUCTS = [
  { id: 1, name: 'Wireless Mouse', category: 'Accessories', price: 25, stock: 120 },
  { id: 2, name: 'Mechanical Keyboard', category: 'Accessories', price: 89, stock: 45 },
  { id: 3, name: '27" Monitor', category: 'Displays', price: 210, stock: 30 },
  { id: 4, name: 'USB-C Hub', category: 'Accessories', price: 40, stock: 0 },
  { id: 5, name: 'Laptop Stand', category: 'Furniture', price: 55, stock: 60 },
  { id: 6, name: 'Webcam 1080p', category: 'Peripherals', price: 70, stock: 15 },
  { id: 7, name: 'Desk Lamp', category: 'Furniture', price: 35, stock: 0 },
  { id: 8, name: 'Noise-cancel Headset', category: 'Peripherals', price: 150, stock: 22 },
]

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Fetch all users. Resolves after ~800ms to mimic network latency.
export async function fetchUsers() {
  await delay(800)
  return structuredClone(USERS)
}

// Fetch all products.
export async function fetchProducts() {
  await delay(600)
  return structuredClone(PRODUCTS)
}

// A flaky endpoint that fails ~40% of the time — use it to practice error handling.
export async function fetchUsersFlaky() {
  await delay(700)
  if (Math.random() < 0.4) {
    throw new Error('Network error: failed to reach /api/users (try again)')
  }
  return structuredClone(USERS)
}

// Persist a "favorite" toggle. Fails ~35% of the time so you can practice
// optimistic updates with rollback on error.
export async function saveFavorite(id, value) {
  await delay(600)
  if (Math.random() < 0.35) {
    throw new Error('Failed to save. Reverting…')
  }
  return { id, favorite: value }
}

// Simulated search endpoint (server-side filtering) for debounce practice.
export async function searchUsers(query) {
  await delay(500)
  const q = query.trim().toLowerCase()
  if (!q) return structuredClone(USERS)
  return USERS.filter(
    (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
  )
}
