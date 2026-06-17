import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { TbLogin2 } from "react-icons/tb";
import { loginUser } from "../../api/userApi";
// import EmployeeList from "../employees/EmployeeList";
import "../../App.css";

function Login({ setCurrentUser }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const user = await loginUser(
      form.email,
      form.password
    );

    localStorage.setItem(
      "currentUser",
      JSON.stringify(user)
    );

    setCurrentUser(user);

    alert("Login Successful");

    if (user.role?.toLowerCase() === "admin") {
      navigate("/settings/subscription");
    } else {
      navigate("/dashboard");
    }

  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo">
          <TbLogin2 />
        </div>

        <h2>Welcome Back</h2>
        <p className="login-sub">
          Login to access EEMS
        </p>

        <form onSubmit={handleLogin}>
          <label>Email</label>

          <div className="input-group">
            <FiMail className="input-icon" />

            <input
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
            />
          </div>

          <label>Password</label>

          <div className="input-group">
            <FiLock className="input-icon" />

            <input
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
              <div>
                <p>
                Forgot Password </p></div>
          <button
            type="submit"
            className="btn-primary"
          >
            Login
          </button>
        </form>

        <p className="login-footer">
          Don't have an account?{" "}
          <Link to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;