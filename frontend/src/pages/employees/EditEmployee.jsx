import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getEmployeeById,
  updateEmployee,
} from "../../api/employeeApi";

import Navbar from "../../components/layout/Navbar";

import "./Employee.css";

function EditEmployee() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      role: "",
      department: "",
      phone: "",
      reporting_manager: "",
      status: "",
      joined_date: "",
    });

  useEffect(() => {
    loadEmployee();
  }, []);

  const loadEmployee =
    async () => {
      const data =
        await getEmployeeById(id);

      setForm(data);
    };

  const handleChange = (
    e
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      await updateEmployee(
        id,
        form
      );

      alert(
        "Employee Updated Successfully"
      );

      navigate(
        `/employees/${id}`
      );
    };

  return (
    <>
      <Navbar />

      <div className="edit-page">

        <div className="edit-card">

          <h2>
            Edit Employee
          </h2>

          <form
            onSubmit={
              handleSubmit
            }
          >

            <input
              name="name"
              value={form.name}
              onChange={
                handleChange
              }
            />

            <input
              name="email"
              value={form.email}
              onChange={
                handleChange
              }
            />

            <input
              name="role"
              value={form.role}
              onChange={
                handleChange
              }
            />

            <input
              name="department"
              value={
                form.department
              }
              onChange={
                handleChange
              }
            />

            <input
              name="phone"
              value={form.phone}
              onChange={
                handleChange
              }
            />

            <button
              type="submit"
              className="save-btn"
            >
              Update Employee
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default EditEmployee;