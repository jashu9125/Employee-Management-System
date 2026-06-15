import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEmployeeById } from "../../api/employeeApi";
import "./Employee.css";
import Navbar from "../../components/layout/Navbar";

function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee = async () => {
    try {
      const data = await getEmployeeById(id);
      setEmployee(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!employee) {
    return <h2>Loading...</h2>;
  }

  return (

     <>
      <Navbar />
    <div className="employee-details-page">

      
      <div className="employee-top-card">

        <div className="employee-header-section">
          <div className="employee-avatar">
            {employee.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1>{employee.name}</h1>
            <p>{employee.role}</p>

            <span
              className={
                employee.status === "Inactive"
                  ? "employee-status inactive"
                  : "employee-status active"
              }
            >
              {employee.status}
            </span>
          </div>
        </div>

        <div className="employee-info-grid">

          <div className="info-box">
            <span>Email</span>
            <strong>{employee.email}</strong>
          </div>

          <div className="info-box">
            <span>Phone Number</span>
            <strong>{employee.phone}</strong>
          </div>

          <div className="info-box">
            <span>Department</span>
            <strong>{employee.department}</strong>
          </div>

          <div className="info-box">
            <span>Reporting Manager</span>
            <strong>{employee.reporting_manager}</strong>
          </div>

          <div className="info-box">
            <span>Joined</span>
            <strong>{employee.joined_date}</strong>
          </div>

        </div>
      </div>

      {/* Bottom Cards */}
      <div className="summary-wrapper">

        {/* Attendance */}
        <div className="summary-card attendance-card">
          <h2>Attendance Summary</h2>

          <div className="stats-grid">

            <div className="stat-item">
              <span>Present</span>
              <h3 className="green">22</h3>
            </div>

            <div className="stat-item">
              <span>Absent</span>
              <h3 className="red">2</h3>
            </div>

            <div className="stat-item">
              <span>Late</span>
              <h3 className="orange">1</h3>
            </div>

          </div>
        </div>

        {/* Leave */}
        <div className="summary-card leave-card-box">
          <h2>Leave Summary</h2>

          <div className="stats-grid leave-grid">

            <div className="stat-item">
              <span>Total Leave</span>
              <h3>20</h3>
            </div>

            <div className="stat-item">
              <span>Used Leave</span>
              <h3>5</h3>
            </div>

            <div className="stat-item">
              <span>Remaining Leave</span>
              <h3 className="blue">15</h3>
            </div>

          </div>
        </div>

      </div>

    </div>
    </>
  );
}

export default EmployeeDetails;