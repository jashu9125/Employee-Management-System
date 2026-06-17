from fastapi import APIRouter

from config.db import SessionLocal


router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)

users = []

@router.post("/signup")
def signup(user: dict):

    users.append(user)

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
            return {
                "message": "Login Successful",
                "user": existing_user
            }

    return {
        "message": "Invalid Credentials"
    }


@router.get("/")
def get_users():
    return users


# ADD THIS
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