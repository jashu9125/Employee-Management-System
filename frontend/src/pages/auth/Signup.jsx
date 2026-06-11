import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { TbUsersPlus } from "react-icons/tb";
import { signupUser } from "../../api/userApi";
import "../../App.css";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "Company A",
    role: "user",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await signupUser({
        name: form.name,
        email: form.email,
        company: form.company,
        role: form.role,
        password: form.password,
      });

      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };

  return (
    <div className="signup">
      <div className="signup-card">
        <div className="signup-logo">
          <TbUsersPlus />
        </div>

        <h2>Create Account</h2>
        <p className="signup-sub">Sign up to access EEMS</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <div className="input-group">
            <FiUser className="input-icon" />
            <input
              placeholder="Enter Full Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              required
            />
          </div>

          <label>Email</label>
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          <label>Company</label>
          <div className="input-group">
            <HiOutlineBuildingOffice2 className="input-icon" />
            <select
              value={form.company}
              onChange={(e) =>
                setForm({ ...form, company: e.target.value })
              }
            >
              <option value="Company A">Company A</option>
              <option value="Company B">Company B</option>
            </select>
          </div>

          <label>Account Role</label>
          <div className="input-group">
            <FiLock className="input-icon" />
            <select
              value={form.role}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value })
              }
            >
              <option value="user">
                User — Dashboard & Employees only
              </option>
              <option value="admin">
                Admin — Full system access
              </option>
            </select>
          </div>

          <label>Password</label>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />
          </div>

          <label>Confirm Password</label>
          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              required
            />
          </div>

          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}