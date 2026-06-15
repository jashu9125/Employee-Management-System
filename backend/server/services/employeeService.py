from repositories.employeeRepository import (
    EmployeeRepository
)


class EmployeeService:

    @staticmethod
    def get_employees(db):
        return (
            EmployeeRepository
            .get_all(db)
        )

    @staticmethod
    def get_employee(
        db,
        employee_id
    ):
        return (
            EmployeeRepository
            .get_by_id(
                db,
                employee_id
            )
        )

    @staticmethod
    def add_employee(
        db,
        employee_data
    ):
        return (
            EmployeeRepository
            .create(
                db,
                employee_data
            )
        )