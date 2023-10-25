from abc import ABC, abstractmethod
from typing import Iterable, Optional

from core.abstract_classes import AbstractRepository
from groups.dto import GroupsWithoutIDDTO, GroupsDTO
from groups.models import Groups


class GroupsInteractorInterface(ABC):
    @abstractmethod
    def get_group_by_id(self, group_id: int) -> Groups:
        pass

    @abstractmethod
    def does_group_exist_by_name(self, group_name: str, id: Optional[int] = None):
        pass

    @abstractmethod
    def get_all_groups_dto(self) -> Iterable[GroupsDTO]:
        pass

    @abstractmethod
    def create_group(self, group_dto: GroupsWithoutIDDTO) -> GroupsDTO:
        pass

    @abstractmethod
    def update_group(self, group_dto: GroupsDTO) -> GroupsDTO:
        pass

    @abstractmethod
    def delete_group(self, group_id: int) -> str:
        pass


class GroupsRepositoryInterface(ABC, AbstractRepository):
    @abstractmethod
    def get_group_by_id(self, group_id: int) -> Groups:
        pass

    @abstractmethod
    def does_group_exist_by_name(self, group_name: str, id: Optional[int] = None):
        pass

    @abstractmethod
    def get_all_groups_dto(self) -> Iterable[GroupsDTO]:
        pass

    @abstractmethod
    def create_group(self, group_dto: GroupsWithoutIDDTO) -> GroupsDTO:
        pass

    @abstractmethod
    def update_group(self, group: Groups, group_dto: GroupsWithoutIDDTO) -> GroupsDTO:
        pass

    @abstractmethod
    def delete_group(self, group: Groups) -> str:
        pass
