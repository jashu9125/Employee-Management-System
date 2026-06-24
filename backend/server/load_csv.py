import pandas as pd

from app.db.db import SessionLocal
from app.models.transaction import Transaction

df = pd.read_csv(
    "dataset/grocery_chain_data.csv"
)

df["transaction_date"] = pd.to_datetime(
    df["transaction_date"],
    dayfirst=True
)

db = SessionLocal()

for _, row in df.iterrows():

    transaction = Transaction(
        customer_id=row["customer_id"],
        store_name=row["store_name"],
        transaction_date=row["transaction_date"],

        aisle=row["aisle"],
        product_name=row["product_name"],

        quantity=row["quantity"],

        unit_price=row["unit_price"],
        total_amount=row["total_amount"],
        discount_amount=row["discount_amount"],
        final_amount=row["final_amount"],

        loyalty_points=row["loyalty_points"]
    )

    db.add(transaction)

db.commit()
db.close()

print("CSV Loaded Successfully")