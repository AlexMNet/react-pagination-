import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState(0)
  const [users, setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  const url = `https://dummyapi.io/data/v1/user?limit=10&page=${
    currentPage + ''
  }`

  useEffect(() => {
    setLoading(true)
    fetch(url, {
      headers: {
        'app-id': '6212c9988ba4611b800c4fe5',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.data)
        setLoading(false)
        setTotalPages(Math.floor(data.total / 10))
      })
      .catch((err) => console.log(err))
  }, [currentPage])

  const nextPage = () => {
    if (currentPage >= totalPages) return
    setCurrentPage((prev) => {
      return prev + 1
    })
  }

  const prevPage = () => {
    if (currentPage <= 0) return
    setCurrentPage((prev) => {
      return prev - 1
    })
  }

  const firstPage = () => {
    setCurrentPage(0)
  }

  const lastPage = () => {
    setCurrentPage(totalPages)
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
          </tr>
          {users &&
            users.map((user, idx) => (
              <tr key={idx}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.title}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <p>{loading ? 'Loading...' : ''}</p>
      <h3>
        Current Page: {currentPage} of {totalPages}
      </h3>
      <button disabled={currentPage === 0 || loading} onClick={firstPage}>
        First
      </button>
      <button disabled={currentPage === 0 || loading} onClick={prevPage}>
        Prev
      </button>
      <button
        disabled={currentPage === totalPages || loading}
        onClick={nextPage}
      >
        Next
      </button>
      <button
        disabled={currentPage === totalPages || loading}
        onClick={lastPage}
      >
        Last
      </button>
    </div>
  )
}

export default App
