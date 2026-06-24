from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.userRoutes import router as user_router
from routes.employeeRoutes import router as employee_router
from routes.subscriptionRoutes import router as subscription_router
from routes.securityRoutes import router as security_router
from routes.forecastRoutes import router as forecast_router

from config.db import Base, engine

from models.User import User
from models.Employee import Employee
from models.Subscription import Subscription
from models.Forecast import Forecast
from models.transaction import Transaction   

Base.metadata.create_all(bind=engine)
Transaction.metadata.create_all(bind=engine)

app = FastAPI(title="Employee Management System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user_router)
app.include_router(employee_router)
app.include_router(subscription_router)
app.include_router(security_router)
app.include_router(forecast_router)

@app.get("/")
def home():
    return {"message": "Employee Management API Running"}