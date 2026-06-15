import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Members from './pages/members/Members'
import EmployeeList from "./pages/employees/EmployeeList";

import EmployeeDetails from "./pages/employees/EmployeeDetails";

import EditEmployee from "./pages/employees/EditEmployee";

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

        <Route
  path="/employees"
  element={
    currentUser
      ? <EmployeeList />
      : <Navigate to="/login" />
  }
/>

<Route
  path="/employees/:id"
  element={
    currentUser
      ? <EmployeeDetails />
      : <Navigate to="/login" />
  }
/>

<Route
  path="/employees/edit/:id"
  element={
    currentUser
      ? <EditEmployee />
      : <Navigate to="/login" />
  }
/>

      </Routes>
    </BrowserRouter>
  )
}

export default App