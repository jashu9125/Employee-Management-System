from fastapi import FastAPI

from routes.forecastRoutes import (
    router as forecast_router
)

app = FastAPI()

app.include_router(
    forecast_router
)