// import { useState } from "react";
// import { Navigate } from "react-router-dom";
// import Navbar from "../../components/layout/Navbar";
// import {
//   getSubscription,
//   changePlan
// } from "../../api/billingApi";

// function Subscription() {
//   const currentUser = JSON.parse(
//     localStorage.getItem("currentUser")
//   );

//   const [selectedPlan, setSelectedPlan] =
//     useState("ENTERPRISE");

//   if (
//     !currentUser ||
//     currentUser.role?.toLowerCase() !== "admin"
//   ) {
//     return <Navigate to="/dashboard" />;
//   }

//   const [subscription,
// setSubscription] =
// useState(null);

// useEffect(() => {
//   loadSubscription();
// }, []);

// const loadSubscription =
// async () => {

//   const data =
//   await getSubscription(
//     currentUser.company
//   );

//   setSubscription(data);

//   setSelectedPlan(
//     data.plan
//   );
// };

//   const handlePlanChange =
// async (plan) => {

//   const data =
//   await changePlan(
//     currentUser.company,
//     plan
//   );

//   setSelectedPlan(
//     data.plan
//   );

//   setSubscription(data);
// };

//   return (
//     <>
//       <Navbar />

//       <div className="subscription-page">

//         <h1>Subscription & Plan</h1>

//         {/* Current Plan */}

//         <div className="current-plan-box">
//           <div>
//             <p>Current Plan</p>
//             <h2>{selectedPlan}</h2>
//           </div>

//           <span className="plan-pill">
//             {selectedPlan}
//           </span>
//         </div>

//         {/* Usage */}

//         <div className="usage-section">
//           <h2>Usage</h2>

//           <div className="usage-row">
//             <span>Employees</span>
//             <strong>
//               23 / Unlimited
//             </strong>
//           </div>

//           <div className="usage-row">
//             <span>Admins</span>
//             <strong>
//               13 / Unlimited
//             </strong>
//           </div>
//         </div>

//         {/* Plans */}

//         <div className="change-plan">
//           <h2>Change Plan</h2>

//           <p>
//             Select a plan for your
//             admin account.
//           </p>

//           <div className="plan-grid">

//             {/* FREE */}

//             <div
//               className={`plan-card ${
//                 selectedPlan === "FREE"
//                   ? "active"
//                   : ""
//               }`}
//             >
//               {selectedPlan === "FREE" && (
//                 <div className="current-tag">
//                   CURRENT
//                 </div>
//               )}

//               <h3>Free</h3>

//               <ul>
//                 <li>
//                   ✓ Max Employees: 10
//                 </li>
//                 <li>
//                   ✓ Max Admins: 1
//                 </li>
//                 <li>
//                   ✓ Analytics Access:
//                   No
//                 </li>
//                 <li>
//                   ✓ Audit Log Access:
//                   No
//                 </li>
//                 <li>
//                   ✓ Export Access:
//                   No
//                 </li>
//               </ul>

//               <button
//                 disabled={
//                   selectedPlan ===
//                   "FREE"
//                 }
//                 onClick={() =>
//                   handlePlanChange(
//                     "FREE"
//                   )
//                 }
//               >
//                 {selectedPlan ===
//                 "FREE"
//                   ? "Current Plan"
//                   : "Select Free"}
//               </button>
//             </div>

//             {/* PROFESSIONAL */}

//             <div
//               className={`plan-card ${
//                 selectedPlan ===
//                 "PROFESSIONAL"
//                   ? "active"
//                   : ""
//               }`}
//             >
//               {selectedPlan ===
//                 "PROFESSIONAL" && (
//                 <div className="current-tag">
//                   CURRENT
//                 </div>
//               )}

//               <h3>Professional</h3>

//               <ul>
//                 <li>
//                   ✓ Max Employees: 50
//                 </li>
//                 <li>
//                   ✓ Max Admins: 3
//                 </li>
//                 <li>
//                   ✓ Analytics Access:
//                   Yes
//                 </li>
//                 <li>
//                   ✓ Audit Log Access:
//                   Yes
//                 </li>
//                 <li>
//                   ✓ Export Access:
//                   Yes
//                 </li>
//               </ul>

//               <button
//                 disabled={
//                   selectedPlan ===
//                   "PROFESSIONAL"
//                 }
//                 onClick={() =>
//                   handlePlanChange(
//                     "PROFESSIONAL"
//                   )
//                 }
//               >
//                 {selectedPlan ===
//                 "PROFESSIONAL"
//                   ? "Current Plan"
//                   : "Select Professional"}
//               </button>
//             </div>

//             {/* ENTERPRISE */}

//             <div
//               className={`plan-card ${
//                 selectedPlan ===
//                 "ENTERPRISE"
//                   ? "active"
//                   : ""
//               }`}
//             >
//               {selectedPlan ===
//                 "ENTERPRISE" && (
//                 <div className="current-tag">
//                   CURRENT
//                 </div>
//               )}

//               <h3>Enterprise</h3>

//               <ul>
//                 <li>
//                   ✓ Max Employees:
//                   Unlimited
//                 </li>
//                 <li>
//                   ✓ Max Admins:
//                   Unlimited
//                 </li>
//                 <li>
//                   ✓ Analytics Access:
//                   Yes
//                 </li>
//                 <li>
//                   ✓ Audit Log Access:
//                   Yes
//                 </li>
//                 <li>
//                   ✓ Export Access:
//                   Yes
//                 </li>
//               </ul>

//               <button
//                 disabled={
//                   selectedPlan ===
//                   "ENTERPRISE"
//                 }
//                 onClick={() =>
//                   handlePlanChange(
//                     "ENTERPRISE"
//                   )
//                 }
//               >
//                 {selectedPlan ===
//                 "ENTERPRISE"
//                   ? "Current Plan"
//                   : "Select Enterprise"}
//               </button>
//             </div>

//           </div>
//         </div>

//       </div>
//     </>
//   );
// }

// export default Subscription;

import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";

import {
  getSubscription,
  changePlan,
  getUsage,
} from "../../api/billingApi";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Subscription() {
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  const [selectedPlan, setSelectedPlan] =
    useState("FREE");

  const [subscription, setSubscription] =
    useState(null);

  const [usage, setUsage] = useState({
    employees: 0,
    admins: 0,
  });

  useEffect(() => {
    if (currentUser) {
      loadData();
    }
  }, []);

  const loadData = async () => {
    try {
      const subscriptionData =
        await getSubscription(
          currentUser.company
        );

      setSubscription(
        subscriptionData
      );

      setSelectedPlan(
        subscriptionData.plan
      );

      const usageData =
        await getUsage(
          currentUser.company
        );

      setUsage(usageData);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load subscription"
      );
    }
  };

  const handlePlanChange =
    async (plan) => {
      try {
        const data =
          await changePlan(
            currentUser.company,
            plan
          );

        if (data.message) {
          toast.error(
            data.message
          );
          return;
        }

        setSelectedPlan(
          data.plan
        );

        setSubscription(data);

        toast.success(
          `Plan changed to ${data.plan}`
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Plan update failed"
        );
      }
    };

  if (
    !currentUser ||
    currentUser.role?.toLowerCase() !==
      "admin"
  ) {
    return (
      <Navigate to="/dashboard" />
    );
  }

  const employeePercent =
    subscription?.max_employees &&
    subscription.max_employees !==
      999999
      ? (
          (usage.employees /
            subscription.max_employees) *
          100
        ).toFixed(0)
      : 0;

  const adminPercent =
    subscription?.max_admins &&
    subscription.max_admins !==
      999999
      ? (
          (usage.admins /
            subscription.max_admins) *
          100
        ).toFixed(0)
      : 0;

  return (
    <>
      <Navbar />

      <div className="subscription-page">
        <h1>
          Subscription & Plan
        </h1>

        {/* Current Plan */}

        <div className="current-plan-box">
          <div>
            <p>Current Plan</p>

            <h2>
              {selectedPlan}
            </h2>
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
              {usage.employees} /
              {subscription
                ?.max_employees ===
              999999
                ? "Unlimited"
                : subscription?.max_employees}
            </strong>
          </div>

          {subscription?.max_employees !==
            999999 && (
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${employeePercent}%`,
                }}
              />
            </div>
          )}

          <div className="usage-row">
            <span>Admins</span>

            <strong>
              {usage.admins} /
              {subscription?.max_admins ===
              999999
                ? "Unlimited"
                : subscription?.max_admins}
            </strong>
          </div>

          {subscription?.max_admins !==
            999999 && (
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${adminPercent}%`,
                }}
              />
            </div>
          )}
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
                selectedPlan ===
                "FREE"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handlePlanChange(
                  "FREE"
                )
              }
            >
              {selectedPlan ===
                "FREE" && (
                <div className="current-tag">
                  CURRENT
                </div>
              )}

              <h3>Free</h3>

              <ul>
                <li>
                  ✓ Max Employees:
                  10
                </li>
                <li>
                  ✓ Max Admins: 1
                </li>
                <li>
                  ✓ Analytics:
                  No
                </li>
                <li>
                  ✓ Audit Logs:
                  No
                </li>
                <li>
                  ✓ Export:
                  No
                </li>
              </ul>
            </div>

            {/* PROFESSIONAL */}

            <div
              className={`plan-card ${
                selectedPlan ===
                "PROFESSIONAL"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handlePlanChange(
                  "PROFESSIONAL"
                )
              }
            >
              {selectedPlan ===
                "PROFESSIONAL" && (
                <div className="current-tag">
                  CURRENT
                </div>
              )}

              <h3>
                Professional
              </h3>

              <ul>
                <li>
                  ✓ Max Employees:
                  50
                </li>
                <li>
                  ✓ Max Admins: 3
                </li>
                <li>
                  ✓ Analytics:
                  Yes
                </li>
                <li>
                  ✓ Audit Logs:
                  Yes
                </li>
                <li>
                  ✓ Export:
                  Yes
                </li>
              </ul>
            </div>

            {/* ENTERPRISE */}

            <div
              className={`plan-card ${
                selectedPlan ===
                "ENTERPRISE"
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handlePlanChange(
                  "ENTERPRISE"
                )
              }
            >
              {selectedPlan ===
                "ENTERPRISE" && (
                <div className="current-tag">
                  CURRENT
                </div>
              )}

              <h3>
                Enterprise
              </h3>

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
                  ✓ Analytics:
                  Yes
                </li>
                <li>
                  ✓ Audit Logs:
                  Yes
                </li>
                <li>
                  ✓ Export:
                  Yes
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Subscription;