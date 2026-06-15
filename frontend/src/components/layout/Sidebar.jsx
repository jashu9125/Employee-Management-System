import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({
  isOpen,
  onClose
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={`sidebar ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-header">

          <h3>Menu</h3>

          <button
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <nav>

          <Link
            to="/employees"
            onClick={onClose}
          >
            Employees
          </Link>

          <Link
            to="/members"
            onClick={onClose}
          >
            Members
          </Link>

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;