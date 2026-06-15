import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";

import {
  getEmployees,
  deleteEmployee,
  createEmployee
} from "../../api/employeeApi";

const EmployeeList = () => {

  const navigate =
    useNavigate();

  const [
    employees,
    setEmployees
  ] = useState([]);

  const [
    filteredEmployees,
    setFilteredEmployees
  ] = useState([]);

  const [
    search,
    setSearch
  ] = useState("");

  const [
    department,
    setDepartment
  ] = useState("");

  const [
    sidebarOpen,
    setSidebarOpen
  ] = useState(false);

  const [
    showModal,
    setShowModal
  ] = useState(false);

  const [
    formData,
    setFormData
  ] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    reporting_manager: "",
    status: "Active",
    joined_date: ""
  });

  useEffect(() => {
    loadEmployees();
  }, []);

 useEffect(() => {
  let data = [...employees];

  if (search) {
    data = data.filter((emp) =>
      emp.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }

  if (department) {
    data = data.filter(
      (emp) =>
        emp.department === department
    );
  }

  // Alphabetical Sort (A-Z)
  data.sort((a, b) =>
    (a.name || "").localeCompare(
      b.name || "",
      undefined,
      { sensitivity: "base" }
    )
  );

  setFilteredEmployees(data);

}, [employees, search, department]);


 const loadEmployees = async () => {
  try {
    const data = await getEmployees();

    const sortedEmployees = (Array.isArray(data) ? data : []).sort(
      (a, b) =>
        (a.name || "").localeCompare(
          b.name || "",
          undefined,
          { sensitivity: "base" }
        )
    );

    setEmployees(sortedEmployees);
  } catch (error) {
    console.log(error);
  }
};

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete Employee?"
        )
      ) {
        return;
      }

      try {

        await deleteEmployee(id);

        loadEmployees();

      } catch (error) {

        console.log(error);

      }
    };

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value
      });
    };

  const handleAddEmployee =
    async (e) => {

      e.preventDefault();

      try {

        await createEmployee(
          formData
        );

        setShowModal(false);

        setFormData({
          name: "",
          email: "",
          phone: "",
          role: "",
          department: "",
          reporting_manager: "",
          status: "Active",
          joined_date: ""
        });

        loadEmployees();

      } catch (error) {

        console.log(error);

      }
    };

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

      <div className="employee-page">

        <div className="employee-header">

          <div>
            <h1>
              Employees
            </h1>

            <p>
              Manage employee
              records and
              information
            </p>
          </div>

          <button
            className="add-btn"
            onClick={() =>
              setShowModal(true)
            }
          >
            + Add Employee
          </button>

        </div>

        <div className="employee-toolbar">

          <input
            type="text"
            placeholder="Search Employee"
            className="search-input"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            className="department-filter"
            value={department}
            onChange={(e) =>
              setDepartment(
                e.target.value
              )
            }
          >
            <option value="">
              All Departments
            </option>

            <option value="HR">
              HR
            </option>

            <option value="IT">
              IT
            </option>

            <option value="Finance">
              Finance
            </option>

            <option value="Sales">
              Sales
            </option>

            <option value="Software Engineer">
              Software Engineer
            </option>

          </select>

        </div>


        <div className="employee-table-wrapper">

          <table className="employee-table">

            <thead>

              <tr>

                <th>
                  Employee
                </th>

                <th>
                  Role
                </th>

                <th>
                  Department
                </th>

                <th>
                  Status
                </th>

                <th>
                  Joined
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredEmployees.map(
                (emp) => (

                  <tr
                    key={emp.id}
                    onClick={() =>
                      navigate(
                        `/employees/${emp.id}`
                      )
                    }
                  >

                    <td>

                      <div className="employee-info">

                        <div className="avatar">
                          {emp.name?.charAt(
                            0
                          )}
                        </div>

                        <div>

                          <h4>
                            {emp.name}
                          </h4>

                          <p>
                            {emp.email}
                          </p>

                        </div>

                      </div>

                    </td>

                    <td>
                      {emp.role}
                    </td>

                    <td>
                      {emp.department}
                    </td>

                    <td>

                      <span
                        className={
                          emp.status ===
                          "Inactive"
                            ? "status inactive"
                            : "status active"
                        }
                      >
                        {emp.status ||
                          "Active"}
                      </span>

                    </td>

                    <td>
                      {emp.joined_date}
                    </td>

                    <td
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                    >

                      <button
                        className="action-btn"
                        onClick={() =>
                          navigate(
                            `/employees/edit/${emp.id}`
                          )
                        }
                      >
                        ✏ Edit
                      </button>

                      <button
                        className="action-btn delete"
                        onClick={() =>
                          handleDelete(
                            emp.id
                          )
                        }
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {showModal && (

          <div className="modal-overlay">

            <div className="employee-modal">

              <h2>
                Add Employee
              </h2>

             <form onSubmit={handleAddEmployee}>

  <div className="form-grid">

    <div className="form-group">
      <label>Name :</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Employee name..."
        required
      />
    </div>

    <div className="form-group">
      <label>Email :</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="employe@company.com"
        required
      />
    </div>

    <div className="form-group">
      <label>Role :</label>
      <input
        type="text"
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Developer"
      />
    </div>

    <div className="form-group">
      <label>Department</label>
      <select
        name="department"
        value={formData.department}
        onChange={handleChange}
      >
        <option value="">It Department</option>
        <option value="HR">HR</option>
        <option value="IT">IT</option>
        <option value="Finance">Finance</option>
        <option value="Sales">Sales</option>
        <option value="Software Engineer">
          Software Engineer
        </option>
      </select>
    </div>

    <div className="form-group">
      <label>Phone Number</label>
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone number"
      />
       
    </div>

    <div className="form-group">
      <label>Reporting Manager</label>
      <select
        name="reporting_manager"
        value={formData.reporting_manager}
        onChange={handleChange}
      >
        <option value="">
          Select Manager
        </option>

        {employees.map((emp) => (
          <option
            key={emp.id}
            value={emp.name}
          >
            {emp.name}
          </option>
        ))}
      </select>
    </div>

    <div className="form-group">
      <label>Status</label>
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Active">
          Active
        </option>

        <option value="Inactive">
          Inactive
        </option>
      </select>
    </div>

    <div className="form-group">
      <label>Joined Date</label>
      <input
        type="date"
        name="joined_date"
        value={formData.joined_date}
        onChange={handleChange}
      />
    </div>

  </div>

  <div className="modal-actions">

    <button
      type="button"
      className="cancel-btn"
      onClick={() =>
        setShowModal(false)
      }
    >
      Cancel
    </button>

    <button
      type="submit"
      className="save-btn"
    >
      Save Employee
    </button>

  </div>

</form>
            </div>

          </div>

        )}

      </div>
    </>
  );
};

export default EmployeeList;