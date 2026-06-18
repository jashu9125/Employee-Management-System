from fastapi import APIRouter
from config.db import SessionLocal

from services.subscriptionService import (
    SubscriptionService
)

router = APIRouter(
    prefix="/api/subscription",
    tags=["Subscription"]
)


@router.get("/{company}")
def get_subscription(company: str):

    db = SessionLocal()

    subscription = (
        SubscriptionService
        .get_subscription(
            db,
            company
        )
    )

    db.close()

    return subscription


@router.put("/{company}")
def change_plan(
    company: str,
    data: dict
):

    db = SessionLocal()

    subscription = (
        SubscriptionService
        .change_plan(
            db,
            company,
            data["plan"]
        )
    )

    db.close()

    return subscription

@router.get("/usage/{company}")
def get_usage(company: str):

    db = SessionLocal()

    employee_count = db.query(Employee).count()

    admin_count = 0

    db.close()

    return {
        "employees": employee_count,
        "admins": admin_count
    }