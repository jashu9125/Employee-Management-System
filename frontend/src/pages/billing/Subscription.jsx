import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

function Subscription() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [selectedPlan, setSelectedPlan] =
    useState("ENTERPRISE");

  if (
    !currentUser ||
    currentUser.role?.toLowerCase() !== "admin"
  ) {
    return <Navigate to="/dashboard" />;
  }

  const handlePlanChange = (plan) => {
    setSelectedPlan(plan);

    alert(
      `Plan changed to ${plan}`
    );
  };

  return (
    <>
      <Navbar />

      <div className="subscription-page">

        <h1>Subscription & Plan</h1>

        {/* Current Plan */}

        <div className="current-plan-box">
          <div>
            <p>Current Plan</p>
            <h2>{selectedPlan}</h2>
          </div>

          <span className="plan-pill">
            {selectedPlan}
          </span>
        </div>

        {/* Usage */}

        <div className="usage-section">
          <h2>Usage</h2>

          <div className="usage-row">
            <span>Employees</span>
            <strong>
              23 / Unlimited
            </strong>
          </div>

          <div className="usage-row">
            <span>Admins</span>
            <strong>
              13 / Unlimited
            </strong>
          </div>
        </div>

        {/* Plans */}

        <div className="change-plan">
          <h2>Change Plan</h2>

          <p>
            Select a plan for your
            admin account.
          </p>

          <div className="plan-grid">

            {/* FREE */}

            <div
              className={`plan-card ${
                selectedPlan === "FREE"
                  ? "active"
                  : ""
              }`}
            >
              {selectedPlan === "FREE" && (
                <div className="current-tag">
                  CURRENT
                </div>
              )}

              <h3>Free</h3>

              <ul>
                <li>
                  ✓ Max Employees: 10
                </li>
                <li>
                  ✓ Max Admins: 1
                </li>
                <li>
                  ✓ Analytics Access:
                  No
                </li>
                <li>
                  ✓ Audit Log Access:
                  No
                </li>
                <li>
                  ✓ Export Access:
                  No
                </li>
              </ul>

              <button
                disabled={
                  selectedPlan ===
                  "FREE"
                }
                onClick={() =>
                  handlePlanChange(
                    "FREE"
                  )
                }
              >
                {selectedPlan ===
                "FREE"
                  ? "Current Plan"
                  : "Select Free"}
              </button>
            </div>

            {/* PROFESSIONAL */}

            <div
              className={`plan-card ${
                selectedPlan ===
                "PROFESSIONAL"
                  ? "active"
                  : ""
              }`}
            >
              {selectedPlan ===
                "PROFESSIONAL" && (
                <div className="current-tag">
                  CURRENT
                </div>
              )}

              <h3>Professional</h3>

              <ul>
                <li>
                  ✓ Max Employees: 50
                </li>
                <li>
                  ✓ Max Admins: 3
                </li>
                <li>
                  ✓ Analytics Access:
                  Yes
                </li>
                <li>
                  ✓ Audit Log Access:
                  Yes
                </li>
                <li>
                  ✓ Export Access:
                  Yes
                </li>
              </ul>

              <button
                disabled={
                  selectedPlan ===
                  "PROFESSIONAL"
                }
                onClick={() =>
                  handlePlanChange(
                    "PROFESSIONAL"
                  )
                }
              >
                {selectedPlan ===
                "PROFESSIONAL"
                  ? "Current Plan"
                  : "Select Professional"}
              </button>
            </div>

            {/* ENTERPRISE */}

            <div
              className={`plan-card ${
                selectedPlan ===
                "ENTERPRISE"
                  ? "active"
                  : ""
              }`}
            >
              {selectedPlan ===
                "ENTERPRISE" && (
                <div className="current-tag">
                  CURRENT
                </div>
              )}

              <h3>Enterprise</h3>

              <ul>
                <li>
                  ✓ Max Employees:
                  Unlimited
                </li>
                <li>
                  ✓ Max Admins:
                  Unlimited
                </li>
                <li>
                  ✓ Analytics Access:
                  Yes
                </li>
                <li>
                  ✓ Audit Log Access:
                  Yes
                </li>
                <li>
                  ✓ Export Access:
                  Yes
                </li>
              </ul>

              <button
                disabled={
                  selectedPlan ===
                  "ENTERPRISE"
                }
                onClick={() =>
                  handlePlanChange(
                    "ENTERPRISE"
                  )
                }
              >
                {selectedPlan ===
                "ENTERPRISE"
                  ? "Current Plan"
                  : "Select Enterprise"}
              </button>
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default Subscription;