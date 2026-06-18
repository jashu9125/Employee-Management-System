import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import { getAlerts } from "../../api/securityApi";

function SecurityMonitoring() {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [alerts, setAlerts] = useState([]);

 const currentUser =
  JSON.parse(
    localStorage.getItem(
      "currentUser"
    ) || "{}"
  );

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      const data = await getAlerts(
        currentUser.company
      );

      setAlerts(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const getRiskBadge = (level) => {
    if (level === "HIGH") {
      return "risk-high";
    }

    if (level === "MEDIUM") {
      return "risk-medium";
    }

    return "risk-low";
  };

  const totalAlerts = alerts.length;

  const criticalAlerts =
    alerts.filter(
      (alert) =>
        alert.risk_level === "HIGH"
    ).length;

  const resolvedAlerts = 0;

  const openAlerts =
    totalAlerts - resolvedAlerts;

  const userScores = {};

  alerts.forEach((alert) => {
    if (!userScores[alert.user_email]) {
      userScores[alert.user_email] = 0;
    }

    userScores[alert.user_email] +=
      alert.risk_score;
  });

  const topRiskUsers = Object.entries(
    userScores
  )
    .map(([email, score]) => ({
      email,
      score,
      level:
        score >= 60
          ? "HIGH"
          : score >= 30
          ? "MEDIUM"
          : "LOW",
    }))
    .sort((a, b) => b.score - a.score);

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

      <div className="security-page">


        <div className="security-header">
          <h1>
            Security Monitoring
          </h1>

          <p>
            Track alerts, risk
            scores and recent
            security events for
            your organization.
          </p>
        </div>


        <div className="security-stats">

          <div className="security-card">
            <h4>
              Security Alerts Today
            </h4>

            <h2>
              {totalAlerts}
            </h2>

            <span>
              Generated today
            </span>
          </div>

          <div className="security-card">
            <h4>Open Alerts</h4>

            <h2>
              {openAlerts}
            </h2>

            <span>
              Needs attention
            </span>
          </div>

          <div className="security-card">
            <h4>
              Resolved Alerts
            </h4>

            <h2>
              {resolvedAlerts}
            </h2>

            <span>
              Closed incidents
            </span>
          </div>

          <div className="security-card">
            <h4>
              Critical Alerts
            </h4>

            <h2>
              {criticalAlerts}
            </h2>

            <span>
              Open critical issues
            </span>
          </div>

        </div>

        <div className="risk-grid">

         

          <div className="risk-card">

            <h2>
              Top Risk Users
            </h2>

            {topRiskUsers.length ===
            0 ? (
              <p>
                No risk users found
              </p>
            ) : (
              topRiskUsers.map(
                (user, index) => (
                  <div
                    className="risk-user-row"
                    key={index}
                  >
                    <div>

                      <h4>
                        {user.email}
                      </h4>

                      <small>
                        Risk Score
                      </small>

                    </div>

                    <div
                      className={
                        getRiskBadge(
                          user.level
                        )
                      }
                    >
                      {user.score}
                    </div>
                  </div>
                )
              )
            )}

          </div>

          <div className="risk-card">

            <h2>
              Top Risk Companies
            </h2>

            <div className="risk-user-row">

              <div>

                <h4>
                  {
                    currentUser.company
                  }
                </h4>

                <small>
                  {topRiskUsers.length} users
                  tracked
                </small>

              </div>

              <div
                className={
                  criticalAlerts > 0
                    ? "risk-high"
                    : "risk-low"
                }
              >
                {alerts.reduce(
                  (
                    total,
                    item
                  ) =>
                    total +
                    item.risk_score,
                  0
                )}
              </div>

            </div>

          </div>

        </div>

        <div className="events-card">

          <h2>
            Recent Security Events
          </h2>

          {alerts.length === 0 ? (
            <p>
              No security events
              found.
            </p>
          ) : (
            alerts
              .slice()
              .reverse()
              .map(
                (
                  alert,
                  index
                ) => (
                  <div
                    key={index}
                    className="event-row"
                  >

                    <div>

                      <h4>
                        {alert.event_type ===
                        "FAILED_LOGIN"
                          ? "Failed Login"
                          : alert.event_type}
                      </h4>

                      <p>
                        Failed login
                        attempt for{" "}
                        {
                          alert.user_email
                        }
                      </p>

                    </div>

                    <div className="event-meta">

                      <small>
                        {new Date(
                          alert.created_at
                        ).toLocaleDateString()}
                      </small>

                      <span
                        className={
                          getRiskBadge(
                            alert.risk_level
                          )
                        }
                      >
                        {
                          alert.risk_level
                        }
                      </span>

                    </div>

                  </div>
                )
              )
          )}

        </div>

      </div>
    </>
  );
}

export default SecurityMonitoring;