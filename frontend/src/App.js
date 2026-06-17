import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import {
  useState,
  useEffect
} from "react";

import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";

import Dashboard from "./pages/dashboard/Dashboard";

import Members from "./pages/members/Members";

import EmployeeList from "./pages/employees/EmployeeList";

import EmployeeDetails from "./pages/employees/EmployeeDetails";

import EditEmployee from "./pages/employees/EditEmployee";

import Subscription from "./pages/billing/Subscription";

import AdminRoute from "./routes/AdminRoute";


function App() {

  const [currentUser, setCurrentUser] =
    useState(null);

  useEffect(() => {

    const user =
      localStorage.getItem(
        "currentUser"
      );

    if (user) {
      setCurrentUser(
        JSON.parse(user)
      );
    }

  }, []);

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            <Navigate to="/signup" />
          }
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/login"
          element={
            <Login
              setCurrentUser={
                setCurrentUser
              }
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            currentUser
              ? <Dashboard />
              : (
                <Navigate
                  to="/login"
                />
              )
          }
        />

        <Route
          path="/members"
          element={
            currentUser
              ? <Members />
              : (
                <Navigate
                  to="/login"
                />
              )
          }
        />

        <Route
          path="/employees"
          element={
            currentUser
              ? <EmployeeList />
              : (
                <Navigate
                  to="/login"
                />
              )
          }
        />

        <Route
          path="/employees/:id"
          element={
            currentUser
              ? (
                <EmployeeDetails />
              )
              : (
                <Navigate
                  to="/login"
                />
              )
          }
        />

        <Route
          path="/employees/edit/:id"
          element={
            currentUser
              ? (
                <EditEmployee />
              )
              : (
                <Navigate
                  to="/login"
                />
              )
          }
        />

        <Route
          path="/settings/subscription"
          element={
            currentUser?.role
              ?.toLowerCase() ===
            "admin"
              ? (
                <Subscription />
              )
              : (
                <Navigate
                  to="/dashboard"
                />
              )
          }
        />
<Route
  path="/settings/subscription"
  element={
    <AdminRoute>
      <Subscription />
    </AdminRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;