from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from config.db import Base


class Transaction(Base):

    __tablename__ = "transactions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    customer_id = Column(Integer)

    store_name = Column(String)

    transaction_date = Column(String)

    aisle = Column(String)

    product_name = Column(String)

    quantity = Column(Integer)

    unit_price = Column(Float)

    total_amount = Column(Float)

    discount_amount = Column(Float)

    final_amount = Column(Float)

    loyalty_points = Column(Integer)