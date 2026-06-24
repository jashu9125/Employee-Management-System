from fastapi import APIRouter

from controllers.forecastController import (
    get_demand_forecast,
    get_category_forecast,
    get_product_forecast,
    get_trends,
    get_category_products,
    get_product_details
)

router = APIRouter(
    prefix="/api/forecasts",
    tags=["Forecasts"]
)

router.add_api_route(
    "/demand",
    get_demand_forecast,
    methods=["GET"]
)

router.add_api_route(
    "/category",
    get_category_forecast,
    methods=["GET"]
)

router.add_api_route(
    "/product",
    get_product_forecast,
    methods=["GET"]
)

router.add_api_route(
    "/trends",
    get_trends,
    methods=["GET"]
)

router.add_api_route(
    "/category/{category}",
    get_category_products,
    methods=["GET"]
)

router.add_api_route(
    "/product/{product}",
    get_product_details,
    methods=["GET"]
)

