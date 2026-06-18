from fastapi import APIRouter

from config.db import SessionLocal

from models.Subscription import Subscription

from services.subscriptionService import (
    SubscriptionService
)

from services.securityService import (
    SecurityService
)

from config.db import SessionLocal

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)

users = []

failed_attempts = {}


@router.post("/signup")
def signup(user: dict):

    users.append(user)

    if user.get("role", "").lower() == "admin":

        db = SessionLocal()

        existing = (
            db.query(Subscription)
            .filter(
                Subscription.company ==
                user["company"]
            )
            .first()
        )

        if not existing:

            SubscriptionService.create_default_plan(
                db,
                user["company"]
            )

        db.close()

    return {
        "message": "Signup Successful",
        "user": user
    }

@router.post("/login")
def login(user: dict):

    email = user.get("email")
    password = user.get("password")

    for existing_user in users:

        if (
            existing_user.get("email") == email
            and
            existing_user.get("password") == password
        ):

            if email in failed_attempts:
                failed_attempts[email] = 0

            return {
                "message": "Login Successful",
                "user": existing_user
            }

    # FAILED LOGIN

    count = failed_attempts.get(
        email,
        0
    ) + 1

    failed_attempts[email] = count

    risk_score = count * 5

    company = "Unknown"

    for existing_user in users:

        if existing_user.get("email") == email:

            company = existing_user.get(
                "company",
                "Unknown"
            )

            break

    db = SessionLocal()

    SecurityService.create_alert(
        db,
        email=email,
        company=company,
        event_type="FAILED_LOGIN",
        score=risk_score
    )

    db.close()

    return {
        "message": "Invalid Credentials"
    }
    

@router.get("/")
def get_users():
    return users


@router.get("/members")
def get_members():

    members = []

    for index, user in enumerate(users):

        members.append({
            "id": index + 1,
            "name": user.get("name", ""),
            "email": user.get("email", ""),
            "role": user.get("role", "Employee"),
            "status": "Active"
        })

    return members


@router.get("/admin-count")
def admin_count():

    count = len([
        user
        for user in users
        if user.get(
            "role",
            ""
        ).lower() == "admin"
    ])

    return {
        "count": count
    }

@router.post("/failed-login")
def failed_login(data: dict):

    email = data.get("email")

    print(
        f"Failed login attempt: {email}"
    )

    return {
        "message":
        "Failed Login Recorded"
    }