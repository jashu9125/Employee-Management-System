import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { getSubscription } from "../../api/billingApi";

function Dashboard() {

  const [subscription, setSubscription] =
    useState(null);

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {

    const loadSubscription = async () => {

      try {

        if (!currentUser) return;

        const data =
          await getSubscription(
            currentUser.company
          );

        setSubscription(data);

      } catch (error) {

        console.error(
          "Subscription Load Error:",
          error
        );

      }
    };

    loadSubscription();

  }, []);

  if (!currentUser) {
    return <h2>Please Login</h2>;
  }

  const stats = {
    totalEmployees: 23,
    activeEmployees: 17,
    totalDepartments: 16,
    pendingRequests: 1,
  };

  const departmentData = [
    { department: "IT", employees: 5 },
    { department: "HR", employees: 1 },
    { department: "Sales", employees: 1 },
    { department: "Finance", employees: 1 },
    { department: "Admin", employees: 1 },
    { department: "Support", employees: 1 },
    { department: "Marketing", employees: 1 },
  ];

  const roleData = [
    { role: "Dev", count: 4 },
    { role: "HR Manager", count: 1 },
    { role: "Recruiter", count: 1 },
    { role: "Admin", count: 1 },
    { role: "Sales", count: 1 },
    { role: "Finance", count: 1 },
  ];

  const statusData = [
    { name: "Active", value: 17 },
    { name: "Inactive", value: 2 },
    { name: "On Leave", value: 4 },
  ];

  const COLORS = [
    "#10b981",
    "#ef4444",
    "#f59e0b",
  ];

  const attendanceData = [
    {
      date: "06-10",
      present: 16,
      absent: 3,
      onLeave: 4,
    },
    {
      date: "06-11",
      present: 13,
      absent: 4,
      onLeave: 6,
    },
    {
      date: "06-12",
      present: 15,
      absent: 4,
      onLeave: 4,
    },
    {
      date: "06-13",
      present: 17,
      absent: 2,
      onLeave: 4,
    },
    {
      date: "06-14",
      present: 14,
      absent: 4,
      onLeave: 5,
    },
    {
      date: "06-15",
      present: 13,
      absent: 4,
      onLeave: 6,
    },
    {
      date: "06-16",
      present: 17,
      absent: 2,
      onLeave: 4,
    },
  ];

  const recentEmployees = [
    {
      id: 1,
      name: "Standard User",
      role: "Employee",
      department: "General",
      joined: "Jun 8, 2026",
    },
    {
      id: 2,
      name: "ironman",
      role: "Hero",
      department: "Dev",
      joined: "Jun 5, 2026",
    },
    {
      id: 3,
      name: "dfer",
      role: "Sales Executive",
      department: "Sales",
      joined: "Jun 5, 2026",
    },
    {
      id: 4,
      name: "sad",
      role: "Developer",
      department: "IT",
      joined: "Jun 3, 2026",
    },
  ];

  return (
    <>
      <Navbar
        onMenuClick={() =>
          setSidebarOpen(true)
        }
      />

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
      />

      <div className="dashboard-container">

        <div className="dashboard-header">

          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome back,
              {" "}
              {currentUser.name}
              {" "}
              ! Viewing analytics for
              {" "}
              {currentUser.company}
            </p>
          </div>

          <div className="dashboard-date">
            {new Date().toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              }
            )}
          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>Current Plan</h3>

            <h2>
              {subscription?.plan ||
                "FREE"}
            </h2>

            <span>
              Active Subscription
            </span>
          </div>

          <div className="stat-card">
            <h3>Total Employees</h3>
            <h2>{stats.totalEmployees}</h2>
            <span>Company Workforce</span>
          </div>

          <div className="stat-card">
            <h3>Active Employees</h3>
            <h2>{stats.activeEmployees}</h2>
            <span>Currently Active</span>
          </div>

          <div className="stat-card">
            <h3>Total Departments</h3>
            <h2>{stats.totalDepartments}</h2>
            <span>Organization Units</span>
          </div>

        </div>

        {subscription &&
        !subscription.analytics_access ? (

          <div className="analytics-locked">

            <h2>
              Analytics Not Available
            </h2>

            <p>
              Upgrade to Professional
              or Enterprise Plan
            </p>

          </div>

        ) : (

          <>
            <div className="charts-row">

              <div className="chart-card">
                <h2>
                  Employee Distribution by Department
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <BarChart
                    data={departmentData}
                    layout="vertical"
                  >
                    <XAxis type="number" />
                    <YAxis
                      dataKey="department"
                      type="category"
                    />
                    <Tooltip />
                    <Bar
                      dataKey="employees"
                      fill="#2563eb"
                    />
                  </BarChart>
                </ResponsiveContainer>

              </div>

              <div className="chart-card">

                <h2>
                  Employee Count by Role
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <BarChart data={roleData}>
                    <XAxis dataKey="role" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      fill="#7c3aed"
                    />
                  </BarChart>
                </ResponsiveContainer>

              </div>

              <div className="chart-card">

                <h2>
                  Employee Status Overview
                </h2>

                <ResponsiveContainer
                  width="100%"
                  height={300}
                >
                  <PieChart>

                    <Pie
                      data={statusData}
                      dataKey="value"
                      outerRadius={100}
                      label
                    >
                      {statusData.map(
                        (entry, index) => (
                          <Cell
                            key={index}
                            fill={
                              COLORS[
                                index %
                                COLORS.length
                              ]
                            }
                          />
                        )
                      )}
                    </Pie>

                    <Tooltip />
                    <Legend />

                  </PieChart>
                </ResponsiveContainer>

              </div>

            </div>
          </>
        )}

      </div>
    </>
  );
}

export default Dashboard;