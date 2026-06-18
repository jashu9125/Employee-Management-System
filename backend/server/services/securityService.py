from models.SecurityAlert import (
    SecurityAlert
)

class SecurityService:

    @staticmethod
    def get_risk_level(score):

        if score >= 60:
            return "HIGH"

        if score >= 30:
            return "MEDIUM"

        return "LOW"

    @staticmethod
    def create_alert(
        db,
        email,
        company,
        event_type,
        score
    ):

        alert = SecurityAlert(
            user_email=email,
            company=company,
            event_type=event_type,
            risk_score=score,
            risk_level=
            SecurityService
            .get_risk_level(score)
        )

        db.add(alert)
        db.commit()
        db.refresh(alert)

        return alert

    @staticmethod
    def get_alerts(
        db,
        company
    ):
        return (
            db.query(SecurityAlert)
            .filter(
                SecurityAlert.company
                == company
            )
            .all()
        )