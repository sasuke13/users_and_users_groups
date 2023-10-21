from typing import Iterable

from groups.interfaces import GroupsInteractorInterface
from users.dto import UsersDTO, CreateUserDTO, UpdateUserDTO
from users.interfaces import UserRepositoryInterface, UserInteractorInterface
from users.models import Users


class UsersInteractor(UserInteractorInterface):
    def __init__(self, users_repository: UserRepositoryInterface, groups_interactor: GroupsInteractorInterface):
        self.users_repository = users_repository
        self.groups_interactor = groups_interactor

    def does_user_exists_by_email(self, email: str):
        return self.users_repository.does_user_exists_by_email(email)

    def get_user_by_id(self, id: int) -> Users:
        return self.users_repository.get_user_by_id(id)

    def get_all_users_dto(self) -> Iterable[UsersDTO]:
        return self.users_repository.get_all_users_dto()

    def create_user(self, create_user_dto: CreateUserDTO) -> UsersDTO:
        self.users_repository.does_user_exists_by_email(create_user_dto.email)
        group = self.groups_interactor.get_group_by_id(create_user_dto.group_id)

        return self.users_repository.create_user(create_user_dto, group)

    def update_user(self, update_user_dto: UpdateUserDTO) -> UsersDTO:
        if update_user_dto.email:
            self.users_repository.does_user_exists_by_email(update_user_dto.email)

        user = self.get_user_by_id(update_user_dto.user_id)
        group = self.groups_interactor.get_group_by_id(update_user_dto.group_id)

        return self.users_repository.update_user(update_user_dto, user, group)

    def delete_user(self, user_id: int) -> str:
        user = self.get_user_by_id(user_id)
        return self.users_repository.delete_user(user)
