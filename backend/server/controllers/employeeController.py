from services.employeeService import (
    EmployeeService
)


class EmployeeController:

    @staticmethod
    def get_all(db):
        return (
            EmployeeService
            .get_employees(db)
        )

    @staticmethod
    def get_one(
        db,
        employee_id
    ):
        return (
            EmployeeService
            .get_employee(
                db,
                employee_id
            )
        )

    @staticmethod
    def create(
        db,
        employee_data
    ):
        return (
            EmployeeService
            .add_employee(
                db,
                employee_data
            )
        )