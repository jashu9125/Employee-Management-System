import pandas as pd

from config.db import engine


class ForecastingService:

    @staticmethod
    def load_data():

        query = """
        SELECT *
        FROM transactions
        """

        df = pd.read_sql(
            query,
            engine
        )

        print("Rows:", len(df))
        print("Columns:", df.columns.tolist())

        if len(df) == 0:
            return pd.DataFrame()

        df["transaction_date"] = pd.to_datetime(
            df["transaction_date"],
            errors="coerce"
        )

        df = df.dropna(
            subset=["transaction_date"]
        )

        return df

    @staticmethod
    def get_category_forecast():

        df = ForecastingService.load_data()

        if df.empty:
            return []

        category_data = (
            df.groupby("aisle")["quantity"]
            .sum()
            .reset_index()
        )

        forecasts = []

        for _, row in category_data.iterrows():

            forecasts.append(
                {
                    "category": row["aisle"],
                    "predicted_demand": int(
                        row["quantity"] * 1.15
                    )
                }
            )

        return forecasts

    @staticmethod
    def get_product_forecast():

        df = ForecastingService.load_data()

        if df.empty:
            return []

        product_data = (
            df.groupby(
                [
                    "product_name",
                    "aisle"
                ]
            )["quantity"]
            .sum()
            .reset_index()
            .sort_values(
                by="quantity",
                ascending=False
            )
        )

        forecasts = []

        for _, row in product_data.iterrows():

            forecasts.append(
                {
                    "product": row["product_name"],
                    "category": row["aisle"],
                    "predicted_demand": int(
                        row["quantity"] * 1.15
                    ),
                    "confidence": 85
                }
            )

        return forecasts[:20]

    @staticmethod
    def get_total_demand_forecast():

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
            85
        }

    @staticmethod
    def get_trends():

        df = ForecastingService.load_data()

        if df.empty:
            return []

        trend_data = (
            df.groupby(
                "transaction_date"
            )["quantity"]
            .sum()
            .reset_index()
            .sort_values(
                by="transaction_date"
            )
        )

        trends = []

        for _, row in trend_data.iterrows():

            historical = int(
                row["quantity"]
            )

            forecast = int(
                historical * 1.15
            )

            trends.append(
                {
                    "date":
                    row["transaction_date"]
                    .strftime("%Y-%m-%d"),

                    "historical":
                    historical,

                    "forecast":
                    forecast
                }
            )

        return trends

    @staticmethod
    def get_category_products(
        category
    ):

        products = (
            ForecastingService
            .get_product_forecast()
        )

        return [
            item
            for item in products
            if item["category"] == category
        ]

    @staticmethod
    def get_product_details(
        product
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