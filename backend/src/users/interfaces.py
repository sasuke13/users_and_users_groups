from abc import ABC, abstractmethod
from typing import Iterable

from core.abstract_classes import AbstractRepository
from groups.models import Groups
from users.dto import CreateUserDTO, UsersDTO, UpdateUserDTO
from users.models import Users


class UserInteractorInterface(ABC):
    @abstractmethod
    def does_user_exists_by_email(self, email: str):
        pass

    @abstractmethod
    def get_user_by_id(self, id: int) -> Users:
        pass

    @abstractmethod
    def get_all_users_dto(self) -> Iterable[UsersDTO]:
        pass

    @abstractmethod
    def create_user(self, create_user_dto: CreateUserDTO) -> UsersDTO:
        pass

    @abstractmethod
    def update_user(self, update_user_dto: UpdateUserDTO) -> UsersDTO:
        pass

    @abstractmethod
    def delete_user(self, user_id: int) -> str:
        pass


class UserRepositoryInterface(ABC, AbstractRepository):
    @abstractmethod
    def does_user_exists_by_email(self, email: str):
        pass

    @abstractmethod
    def get_user_by_id(self, id: int) -> Users:
        pass

    @abstractmethod
    def get_all_users_dto(self) -> Iterable[UsersDTO]:
        pass

    @abstractmethod
    def create_user(self, update_user_dto: UpdateUserDTO, group: Groups | None) -> UsersDTO:
        pass

    @abstractmethod
    def update_user(self, update_user_dto: UpdateUserDTO, user: Users, group: Groups) -> UsersDTO:
        pass

    @abstractmethod
    def delete_user(self, user_to_delete: Users) -> str:
        pass
