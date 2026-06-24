from models.AuditLog import AuditLog


class ForecastAuditService:

    @staticmethod
    def create_log(
        db,
        company,
        user,
        action
    ):

        log = AuditLog(
            company=company,
            user=user,
            action=action
        )

        db.add(log)

        db.commit()