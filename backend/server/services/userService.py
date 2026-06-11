from repositories.userRepository import UserRepository

class UserService:

    @staticmethod
    def get_members(db):
        return UserRepository.get_all_users(db)