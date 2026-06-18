from fastapi import APIRouter
from config.db import SessionLocal

from services.securityService import (
    SecurityService
)

router = APIRouter(
    prefix="/api/security",
    tags=["Security"]
)

@router.get("/{company}")
def get_alerts(company:str):

    db = SessionLocal()

    alerts = (
        SecurityService
        .get_alerts(
            db,
            company
        )
    )

    db.close()

    return alerts