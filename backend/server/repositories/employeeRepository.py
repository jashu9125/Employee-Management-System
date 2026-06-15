from models.Employee import Employee


class EmployeeRepository:

    @staticmethod
    def get_all(db):
        return (
            db.query(Employee)
            .all()
        )

    @staticmethod
    def get_by_id(
        db,
        employee_id
    ):
        return (
            db.query(Employee)
            .filter(
                Employee.id ==
                employee_id
            )
            .first()
        )

    @staticmethod
    def create(
        db,
        employee_data
    ):
        employee = Employee(
            **employee_data
        )

        db.add(employee)

        db.commit()

        db.refresh(employee)

        return employee