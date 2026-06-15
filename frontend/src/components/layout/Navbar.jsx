import React from "react";
import {
  Menu,
  Bell,
  Moon,
  Users,
  Calendar,
  Building2,
  ClipboardList
} from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="navbar">
      <div className="navbar-left">

        <button
          className="menu-btn"
          onClick={onMenuClick}
        >
          <Menu size={28} />
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

        <span className="nav-active">
          Employees
        </span>

        <button className="company-btn">
          Company A
        </button>
      </div>

      <div className="navbar-center">

        <div className="nav-link">
          <Users size={18} />
          Team
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
            D
          </div>

          <span>das</span>

        </div>

      </div>
    </header>
  );
};

export default Navbar;