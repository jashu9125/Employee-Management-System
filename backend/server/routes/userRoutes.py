from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/api/users",
    tags=["Users"]
)

users = []

@router.post("/signup")
def signup(user: dict):

    existing_user = next(
        (
            u for u in users
            if u["email"] == user.get("email")
            and u["company"] == user.get("company")
        ),
        None
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists in this company"
        )

    users.append({
        "id": len(users) + 1,
        "name": user.get("name"),
        "email": user.get("email"),
        "password": user.get("password"),
        "company": user.get("company"),
        "role": user.get("role"),
        "status": "Active"
    })

    return {"message": "Signup successful"}

@router.post("/login")
def login(credentials: dict):

    user = next(
        (
            u for u in users
            if u["email"] == credentials.get("email")
            and u["password"] == credentials.get("password")
        ),
        None
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return user

@router.get("/members")
def get_members():
    return users