from fastapi import Depends
from sqlalchemy.orm import Session

from config.db import get_db
from services.userService import UserService

class UserController:

    @staticmethod
    def get_members(db: Session = Depends(get_db)):
        users = UserService.get_members(db)

        return [
            {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "role": user.role,
                "status": user.status,
            }
            for user in users
        ]