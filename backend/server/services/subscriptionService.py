from models.Subscription import Subscription


class SubscriptionService:

    @staticmethod
    def create_default_plan(
        db,
        company
    ):
        subscription = Subscription(
            company=company,
            plan="FREE",
            max_employees=10,
            max_admins=1,
            analytics_access=False
        )

        db.add(subscription)
        db.commit()
        db.refresh(subscription)

        return subscription

    @staticmethod
    def get_subscription(
        db,
        company
    ):
        return (
            db.query(Subscription)
            .filter(
                Subscription.company == company
            )
            .first()
        )

    @staticmethod
    def change_plan(
        db,
        company,
        plan
    ):
        subscription = (
            db.query(Subscription)
            .filter(
                Subscription.company == company
            )
            .first()
        )

        if not subscription:
            return None

        if plan == "FREE":
            subscription.plan = "FREE"
            subscription.max_employees = 10
            subscription.max_admins = 1
            subscription.analytics_access = False

        elif plan == "PROFESSIONAL":
            subscription.plan = "PROFESSIONAL"
            subscription.max_employees = 50
            subscription.max_admins = 3
            subscription.analytics_access = True

        elif plan == "ENTERPRISE":
            subscription.plan = "ENTERPRISE"
            subscription.max_employees = 999999
            subscription.max_admins = 999999
            subscription.analytics_access = True

        db.commit()
        db.refresh(subscription)

        return subscription