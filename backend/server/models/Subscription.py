from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean
)

from config.db import Base


class Subscription(Base):
    __tablename__ = "subscriptions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    company = Column(
        String,
        unique=True
    )

    plan = Column(
        String,
        default="FREE"
    )

    max_employees = Column(
        Integer,
        default=10
    )

    max_admins = Column(
        Integer,
        default=1
    )

    analytics_access = Column(
        Boolean,
        default=False
    )