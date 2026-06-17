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
// import { getSubscription } from "../../api/billingApi";

function Dashboard() {
  // const [subscription, setSubscription] = useState(null);
  const [subscription] = useState({
  analytics_access: true,
  plan: "ENTERPRISE",
});
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!currentUser) {
    return <h2>Please Login</h2>;
  }

  // Sample Data
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

  const COLORS = ["#10b981", "#ef4444", "#f59e0b"];

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

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>
              Welcome back, {currentUser.name}! Viewing
              analytics for {currentUser.company}
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

        {/* Stats */}
        <div className="stats-grid">

          <div className="stat-card">
            <h3>Total Employees</h3>
            <h2>{stats.totalEmployees}</h2>
            <span>Company workforce</span>
          </div>

          <div className="stat-card">
            <h3>Active Employees</h3>
            <h2>{stats.activeEmployees}</h2>
            <span>Currently active</span>
          </div>

          <div className="stat-card">
            <h3>Total Departments</h3>
            <h2>{stats.totalDepartments}</h2>
            <span>Organization units</span>
          </div>

          <div className="stat-card">
            <h3>Pending Requests</h3>
            <h2>{stats.pendingRequests}</h2>
            <span>Role change approvals</span>
          </div>

        </div>

        {/* Analytics Lock */}
        {subscription &&
          !subscription.analytics_access && (
            <div className="analytics-locked">
              <h2>
                Analytics not available on your
                plan
              </h2>

              <p>
                Upgrade to Professional or
                Enterprise in Subscription
                Settings
              </p>
            </div>
          )}

        {/* Charts */}
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
                  radius={[0, 8, 8, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h2>Employee Count by Role</h2>

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
            <h2>Employee Status Overview</h2>

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

        {/* Bottom Row */}
        <div className="bottom-row">

          <div className="chart-card attendance-card">
            <h2>Attendance Analytics</h2>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <LineChart
                data={attendanceData}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                />

                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line
                  type="monotone"
                  dataKey="present"
                  stroke="#10b981"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="absent"
                  stroke="#ef4444"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="onLeave"
                  stroke="#f59e0b"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card recent-card">
            <div className="recent-header">
              <h2>Recent Employees</h2>
              <button>View All</button>
            </div>

            {recentEmployees.map((emp) => (
              <div
                className="employee-row"
                key={emp.id}
              >
                <div className="avatar">
                  {emp.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="employee-info">
                  <h4>{emp.name}</h4>
                  <p>{emp.role}</p>
                </div>

                <div className="employee-meta">
                  <p>{emp.department}</p>
                  <small>{emp.joined}</small>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;