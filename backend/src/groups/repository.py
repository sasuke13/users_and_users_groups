from itertools import repeat
from typing import Iterable

from annoying.functions import get_object_or_None

from core.exceptions import InstanceDoesNotExist, InstanceAlreadyExists, DeletingForbiddenException
from groups.dto import GroupsWithoutIDDTO, GroupsDTO
from groups.interfaces import GroupsRepositoryInterface
from groups.models import Groups


class GroupsRepository(GroupsRepositoryInterface):
    def get_group_by_id(self, group_id: int) -> Groups:
        group = get_object_or_None(Groups.objects.prefetch_related('users'), id=group_id)
        if not group:
            raise InstanceDoesNotExist(f'Group with id: {group_id} does not exist!')

        return group

    def does_group_exist_by_name(self, group_name: str):
        group = get_object_or_None(Groups, name=group_name)

        if group:
            raise InstanceAlreadyExists(f'Group with name: {group_name} already exists!')

    def get_all_groups_dto(self) -> Iterable[GroupsDTO]:
        groups = Groups.objects.prefetch_related('users').all()

        return map(self.converter.to_dto, groups, repeat(GroupsDTO))

    def create_group(self, group_dto: GroupsWithoutIDDTO) -> GroupsDTO:
        group = Groups.objects.create(
            **group_dto.__dict__
        )

        return self.converter.to_dto(group, GroupsDTO)

    def update_group(self, group: Groups, group_dto: GroupsWithoutIDDTO) -> GroupsDTO:
        fields_to_update = group_dto.__dict__

        for field, value in fields_to_update.items():
            if value or value == False:
                setattr(group, field, value)

        group.save()

        return self.converter.to_dto(group, GroupsDTO)

    def delete_group(self, group: Groups) -> str:
        if group.users.all():
            raise DeletingForbiddenException('Deletion of group forbidden if user is the member of it!')
        group.delete()

        return 'Group was successfully deleted!'
