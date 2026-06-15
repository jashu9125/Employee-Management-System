import { useState } from "react";
import { createEmployee } from "../../api/employeeApi";

function AddEmployee({
  closeModal,
  refreshEmployees,
  employees,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    department: "",
    phone: "",
    reporting_manager: "",
    status: "Active",
    joined_date: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      await createEmployee(form);

      alert(
        "Employee Added Successfully"
      );

      refreshEmployees();

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="employee-modal">

        <h2>Add Employee</h2>

        <form
          onSubmit={handleSubmit}
        >
          <div className="form-grid">
            <label htmlFor="Name">Name</label>
            <input
              name="name"
              placeholder="Employee Name"
              onChange={handleChange}
              required
            />
            <label htmlFor="email">email</label>
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <input
              name="role"
              placeholder="Role"
              onChange={handleChange}
              required
            />

            <input
              name="department"
              placeholder="Department"
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
            />

            <select
              name="reporting_manager"
              onChange={handleChange}
            >
              <option value="">
                None
              </option>

              {employees.map(
                (employee) => (
                  <option
                    key={
                      employee.id
                    }
                    value={
                      employee.name
                    }
                  >
                    {employee.name}
                  </option>
                )
              )}
            </select>

            <select
              name="status"
              onChange={handleChange}
            >
              <option value="Active">
                Active
              </option>

              <option value="Inactive">
                Inactive
              </option>
            </select>

            <input
              type="date"
              name="joined_date"
              onChange={handleChange}
            />

          </div>

          <div className="modal-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={
                closeModal
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Add Employee
            </button>

          </div>
        </form>

      </div>
    </div>
  );
}

export default AddEmployee;