from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from config.db import get_db
from models.Employee import Employee

from controllers.employeeController import (
    EmployeeController
)

router = APIRouter(
    prefix="/api/employees",
    tags=["Employees"]
)


# GET ALL EMPLOYEES
@router.get("/")
def get_employees(
    db: Session = Depends(get_db)
):
    return EmployeeController.get_all(db)


# GET EMPLOYEE BY ID
@router.get("/{employee_id}")
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = (
        db.query(Employee)
        .filter(
            Employee.id == employee_id
        )
        .first()
    )

    if not employee:
        return {
            "message": "Employee Not Found"
        }

    return employee


# CREATE EMPLOYEE
@router.post("/")
def create_employee(
    employee: dict,
    db: Session = Depends(get_db)
):
    return EmployeeController.create(
        db,
        employee
    )


# UPDATE EMPLOYEE
@router.put("/{employee_id}")
def update_employee(
    employee_id: int,
    employee_data: dict,
    db: Session = Depends(get_db)
):
    employee = (
        db.query(Employee)
        .filter(
            Employee.id == employee_id
        )
        .first()
    )

    if not employee:
        return {
            "message": "Employee Not Found"
        }

    for key, value in employee_data.items():
        setattr(
            employee,
            key,
            value
        )

    db.commit()
    db.refresh(employee)

    return employee


# DELETE EMPLOYEE
@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db)
):
    employee = (
        db.query(Employee)
        .filter(
            Employee.id == employee_id
        )
        .first()
    )

    if not employee:
        return {
            "message": "Employee Not Found"
        }

    db.delete(employee)
    db.commit()

    return {
        "message": "Employee Deleted Successfully"
    }