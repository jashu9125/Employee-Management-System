import requests

from config.db import (
    SessionLocal
)

from models.Employee import (
    Employee
)


def seed_employees():

    db = SessionLocal()

    existing = (
        db.query(Employee)
        .count()
    )

    if existing:
        return

    users = requests.get(
        "https://jsonplaceholder.typicode.com/users"
    ).json()

    for user in users:

        employee = Employee(
            name=user["name"],
            email=user["email"],
            role="Software Engineer",
            department="IT",
            phone=user["phone"],
            reporting_manager="None",
            status="Active",
            joined_date="2025-01-01",
            total_leave=20,
            used_leave=5
        )

        db.add(employee)

    db.commit()

    db.close()