from services.forecastingService import (
    ForecastingService
)


def get_demand_forecast():

    products = (
        ForecastingService
        .get_product_forecast()
    )

    total = sum(
        item["predicted_demand"]
        for item in products
    )

    return {
        "forecast_period":
        "Next 30 Days",

        "predicted_demand":
        total,

        "confidence":
        83
    }


def get_category_forecast():

    return (
        ForecastingService
        .get_category_forecast()
    )


def get_product_forecast():

    return (
        ForecastingService
        .get_product_forecast()
    )


def get_trends():

    return (
        ForecastingService
        .get_trends()
    )


def get_category_products(
    category: str
):

    products = (
        ForecastingService
        .get_product_forecast()
    )

    return [
        product
        for product in products
        if product["category"] == category
    ]


def get_product_details(
    product: str
):

    products = (
        ForecastingService
        .get_product_forecast()
    )

    for item in products:

        if (
            item["product"]
            == product
        ):
            return item

    return {
        "message":
        "Product not found"
    }
