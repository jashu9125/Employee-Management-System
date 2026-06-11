from sqlalchemy.orm import Session
from models.User import User

class UserRepository:

    @staticmethod
    def get_all_users(db: Session):
        return db.query(User).all()