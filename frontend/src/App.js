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

import SecurityMonitoring from "./pages/security/SecurityMonitoring";

import AdminRoute from "./routes/AdminRoute";

function App() {

  const [currentUser, setCurrentUser] =
    useState(null);

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "currentUser"
      );

    if (
      storedUser &&
      storedUser !== "undefined"
    ) {
      try {

        setCurrentUser(
          JSON.parse(
            storedUser
          )
        );

      } catch (error) {

        console.error(
          "Invalid User",
          error
        );

        localStorage.removeItem(
          "currentUser"
        );
      }
    }

  }, []);

  return (
    <BrowserRouter>

      <Routes>

        {/* Default Route */}

        <Route
          path="/"
          element={
            <Navigate
              to="/signup"
            />
          }
        />

        {/* Authentication */}

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

        {/* Dashboard */}

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

        {/* Members */}

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

        {/* Employees */}

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

        {/* Admin Routes */}

        <Route
          path="/settings/subscription"
          element={
            <AdminRoute>
              <Subscription />
            </AdminRoute>
          }
        />

        <Route
          path="/security"
          element={
            <AdminRoute>
              <SecurityMonitoring />
            </AdminRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;