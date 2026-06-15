from sqlalchemy import (
    Column,
    Integer,
    String
)

from config.db import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(String)

    email = Column(String)

    role = Column(String)

    department = Column(String)

    phone = Column(String)

    reporting_manager = Column(String)

    status = Column(String)

    joined_date = Column(String)

    total_leave = Column(
        Integer,
        default=20
    )

    used_leave = Column(
        Integer,
        default=0
    )