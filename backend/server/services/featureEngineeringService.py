import pandas as pd


class FeatureEngineeringService:

    @staticmethod
    def build_features(df):

        df = (
            df.sort_values(
                "transaction_date"
            )
        )

        df["day"] = (
            df[
                "transaction_date"
            ]
            .dt.day
        )

        df["month"] = (
            df[
                "transaction_date"
            ]
            .dt.month
        )

        df["weekday"] = (
            df[
                "transaction_date"
            ]
            .dt.dayofweek
        )

        df["lag_1"] = (
            df["quantity"]
            .shift(1)
        )

        df["lag_7"] = (
            df["quantity"]
            .shift(7)
        )

        df[
            "rolling_mean_7"
        ] = (
            df["quantity"]
            .rolling(7)
            .mean()
        )

        df.fillna(
            0,
            inplace=True
        )

        return df