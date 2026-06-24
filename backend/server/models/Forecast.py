from sqlalchemy import Column, Integer, String, Float

from config.db import Base


class Forecast(Base):

    __tablename__ = "forecasts"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    forecast_date = Column(
        String
    )

    category = Column(
        String
    )

    product = Column(
        String
    )

    predicted_demand = Column(
        Integer
    )

    confidence = Column(
        Float
    )