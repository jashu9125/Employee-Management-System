import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({
  isOpen,
  onClose
}) => {

  const currentUser = JSON.parse(
    localStorage.getItem(
      "currentUser"
    )
  );

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
          isOpen
            ? "open"
            : ""
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
            to="/dashboard"
            onClick={onClose}
          >
            Dashboard
          </Link>

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

          {/* Admin Only */}

          {currentUser?.role ===
            "admin" && (
            <>
              <Link
                to="/settings/subscription"
                onClick={onClose}
              >
                Subscription
              </Link>

              <Link
                to="/security"
                onClick={onClose}
              >
                Security Monitoring
              </Link>

              <Link
  to="/forecasting"
  onClick={onClose}
>
  Demand Forecasting
</Link>
            </>
          )}

        </nav>

      </aside>
    </>
  );
};

export default Sidebar;