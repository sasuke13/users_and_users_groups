from typing import Iterable, Optional

from core.exceptions import InstanceDoesNotExist
from groups.interfaces import GroupsInteractorInterface
from users.dto import UsersDTO, CreateUserDTO, UpdateUserDTO
from users.interfaces import UserRepositoryInterface, UserInteractorInterface
from users.models import Users


class UsersInteractor(UserInteractorInterface):
    def __init__(self, users_repository: UserRepositoryInterface, groups_interactor: GroupsInteractorInterface):
        self.users_repository = users_repository
        self.groups_interactor = groups_interactor

    def does_user_exists_by_email(self, email: str, id: Optional[int] = None):
        return self.users_repository.does_user_exists_by_email(email, id)

    def get_user_by_id(self, id: int) -> Users:
        return self.users_repository.get_user_by_id(id)

    def get_all_users_dto(self) -> Iterable[UsersDTO]:
        return self.users_repository.get_all_users_dto()

    def create_user(self, create_user_dto: CreateUserDTO) -> UsersDTO:
        self.users_repository.does_user_exists_by_email(create_user_dto.email)

        try:
            self.groups_interactor.get_group_by_id(create_user_dto.group_id)
        except InstanceDoesNotExist:
            create_user_dto.group_id = None

        return self.users_repository.create_user(create_user_dto)

    def update_user(self, update_user_dto: UpdateUserDTO) -> UsersDTO:
        user = self.get_user_by_id(update_user_dto.user_id)

        if update_user_dto.email:
            self.users_repository.does_user_exists_by_email(update_user_dto.email, update_user_dto.user_id)

        try:
            group = self.groups_interactor.get_group_by_id(update_user_dto.group_id)
        except InstanceDoesNotExist:
            group = None

        return self.users_repository.update_user(update_user_dto, user, group)

    def delete_user(self, user_id: int) -> str:
        user = self.get_user_by_id(user_id)
        return self.users_repository.delete_user(user)
