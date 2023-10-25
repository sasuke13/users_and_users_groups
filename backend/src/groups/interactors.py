from typing import Iterable, Optional

from groups.dto import GroupsDTO, GroupsWithoutIDDTO
from groups.interfaces import GroupsInteractorInterface, GroupsRepositoryInterface
from groups.models import Groups


class GroupsInteractor(GroupsInteractorInterface):
    def __init__(self, groups_repository: GroupsRepositoryInterface):
        self.groups_repository = groups_repository

    def get_group_by_id(self, group_id: int) -> Groups:
        return self.groups_repository.get_group_by_id(group_id)

    def does_group_exist_by_name(self, group_name: str, id: Optional[int] = None):
        self.groups_repository.does_group_exist_by_name(group_name, id)

    def get_all_groups_dto(self) -> Iterable[GroupsDTO]:
        return self.groups_repository.get_all_groups_dto()

    def create_group(self, group_dto: GroupsWithoutIDDTO) -> GroupsDTO:
        self.does_group_exist_by_name(group_dto.name)
        return self.groups_repository.create_group(group_dto)

    def update_group(self, group_dto: GroupsDTO) -> GroupsDTO:
        if group_dto.name:
            self.does_group_exist_by_name(group_dto.name, group_dto.id)

        group = self.get_group_by_id(group_dto.id)
        group_dict = group_dto.__dict__
        group_dict.pop('id')
        group_dto = GroupsWithoutIDDTO(**group_dict)

        return self.groups_repository.update_group(group, group_dto)

    def delete_group(self, group_id: int) -> str:
        group = self.groups_repository.get_group_by_id(group_id)

        return self.groups_repository.delete_group(group)
