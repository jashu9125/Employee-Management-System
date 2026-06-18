import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";
import { TbLogin2 } from "react-icons/tb";
import { loginUser } from "../../api/userApi";
import axios from "axios";
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
      const response = await loginUser(
        form.email,
        form.password
      );

      const user = response.user;

      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      setCurrentUser(user);

      alert("Login Successful");

      if (
        user.role?.toLowerCase() ===
        "admin"
      ) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {

      try {

        await axios.post(
          "http://localhost:8000/api/users/failed-login",
          {
            email: form.email
          }
        );

      } catch (err) {
        console.log(
          "Failed Login Alert Error",
          err
        );
      }

      alert(
        error.message ||
        "Invalid Credentials"
      );
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
            <p>Forgot Password</p>
          </div>

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