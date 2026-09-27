import { useEffect, useState } from 'react'
import { fetchUsersFlaky } from '../services/api'

// ===========================================================================
// CHALLENGE 1 — Load data from the API into the table
// ===========================================================================
// The `<UsersTable />` markup is already built. The service `fetchUsersFlaky()`
// returns a Promise<User[]> and FAILS ~40% of the time on purpose.
//
// TASKS:
//   1. On mount, call fetchUsersFlaky() and store the users in state.
//   2. Show a "Loading..." message while the request is in flight.
//   3. If the request fails, show the error message + a "Retry" button.
//   4. Render one <tr> per user in the table body.
// ===========================================================================

export function Component() {
  // TODO 1: add state for `users`, `loading`, and `error`
  const [users, setUsers] = useState([])

  const [loading,setLoading]= useState(false);

  const [error,setError]=useState('');


  // TODO 2: write a `load()` function that sets loading true, calls the API,
  //         stores users on success, stores the error message on failure,
  //         and always turns loading off at the end.

  const load = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchUsersFlaky();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // TODO 3: call load() once when the component mounts (useEffect).

  useEffect(()=>{
    load();
  },[])//when empty component ,mount

  // TODO 4: render loading / error / table states below.\

  if(loading){
    return <div className='status'>Loading ...</div>
  }
  if(error){
    return<div className='status error'>
      <p>{error}</p>
 <button className="btn" onClick={load}>Retry</button>
    </div>
  }

  return (
    <div>
         <h1>ak</h1>
      <h3>Team Members</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {/* TODO: map over users -> one <tr key={user.id}> per user */
          users.map(user=>(
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          ))
          }
        </tbody>
      </table>
    </div>
  )
}

export function Solution() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  async function load() {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchUsersFlaky()
      setUsers(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <div className="status">Loading users…</div>
  if (error) {
    return (
      <div className="status error">
        <p>{error}</p>
        <button className="btn" onClick={load}>Retry</button>
      </div>
    )
  }

  return (
    <div>
   
      <h3>Team Members</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const meta = {
  id: 'api-table',
  num: 1,
  title: 'Fetch data into a table',
  difficulty: 'easy',
  summary: 'Call the API on mount, handle loading + error, render rows.',
  tasks: [
    'On mount, call fetchUsersFlaky() and store the users in state.',
    'Show a "Loading…" message while the request is in flight.',
    'On failure, show the error message and a Retry button.',
    'Render one row per user in the table body.',
  ],
  hint: 'Use useEffect with an empty dependency array to run once on mount. Wrap the await in try/catch/finally so loading is always cleared.',
}
