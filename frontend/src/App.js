import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Members from './pages/members/Members'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const user = localStorage.getItem('currentUser')
    if (user) setCurrentUser(JSON.parse(user))
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route
          path="/members"
          element={currentUser? <Members /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to="/signup" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App