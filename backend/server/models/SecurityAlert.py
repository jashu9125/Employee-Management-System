from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime
)

from datetime import datetime
from config.db import Base

class SecurityAlert(Base):

    __tablename__ = "security_alerts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_email = Column(String)

    company = Column(String)

    event_type = Column(String)

    risk_score = Column(
        Integer,
        default=0
    )

    risk_level = Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )