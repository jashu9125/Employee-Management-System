import pandas as pd

from config.db import SessionLocal
from models.transaction import Transaction

db = SessionLocal()

df = pd.read_csv(
    "dataset/grocery_chain_data.csv",
    sep="\t"
)

print(df.head())

for _, row in df.iterrows():

    transaction = Transaction(

        customer_id=int(
            row["customer_id"]
        ),

        store_name=str(
            row["store_name"]
        ),

        transaction_date=str(
            row["transaction_date"]
        ),

        aisle=str(
            row["aisle"]
        ),

        product_name=str(
            row["product_name"]
        ),

        quantity=int(
            row["quantity"]
        ),

        unit_price=float(
            row["unit_price"]
        ),

        total_amount=float(
            row["total_amount"]
        ),

        discount_amount=float(
            row["discount_amount"]
        ),

        final_amount=float(
            row["final_amount"]
        ),

        loyalty_points=int(
            row["loyalty_points"]
        )
    )

    db.add(transaction)

db.commit()

print("Transactions Imported Successfully")

db.close()