import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Bell,
  Moon,
  Users,
  Calendar,
  Building2,
  ClipboardList
} from "lucide-react";
import { Settings } from "lucide-react";

const Navbar = ({ onMenuClick }) => {

  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  return (
    <header className="navbar">

      <div className="navbar-left">

        <button
          className="menu-btn"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>

        <div className="logo-section">
          <div className="logo-circle">
            E
          </div>

          <div>
            <h2>EEMS</h2>

            <p>
              Enterprise Employee
              Management
            </p>
          </div>
        </div>

      </div>

      <div className="navbar-center">

        <div
          className="nav-link"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          Dashboard
        </div>

        <div
          className="nav-link"
          onClick={() =>
            navigate("/employees")
          }
        >
          <Users size={18} />
          Employees
        </div>

        <div className="nav-link">
          <Calendar size={18} />
          Attendance
        </div>

        <div className="nav-link">
          <Building2 size={18} />
          Departments
        </div>

        <div className="nav-link">
          <ClipboardList size={18} />
          Audit Logs
        </div>

       {currentUser?.role?.toLowerCase() === "admin" && (
  <div
    className="nav-link"
    onClick={() =>
      navigate("/settings/subscription")
    }
  >
    <Settings size={18} />
    Settings
  </div>
)}
      </div>

      <div className="navbar-right">

        <button className="icon-btn">
          <Moon size={20} />
        </button>

        <button className="icon-btn">
          <Bell size={20} />
        </button>

        <div className="profile-box">

          <div className="profile-avatar">
            {currentUser?.name
              ?.charAt(0)
              ?.toUpperCase()}
          </div>

          <span>
            {currentUser?.name}
          </span>

        </div>

      </div>

    </header>
  );
};

export default Navbar;