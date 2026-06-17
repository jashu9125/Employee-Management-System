from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config.db import (
    Base,
    engine
)

from routes.userRoutes import (
    router as user_router
)

from routes.employeeRoutes import (
    router as employee_router
)


app = FastAPI(
    title="Employee Management System"
)

Base.metadata.create_all(
    bind=engine
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(
    user_router
)

app.include_router(
    employee_router
)

@app.get("/")
def home():
    return {
        "message":
        "Employee Management API Running"
    }