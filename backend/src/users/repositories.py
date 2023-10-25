from itertools import repeat
from typing import Iterable, Optional

from annoying.functions import get_object_or_None

from core.exceptions import InstanceDoesNotExist, InstanceAlreadyExists
from groups.models import Groups
from users.dto import UsersDTO, UpdateUserDTO, CreateUserDTO
from users.interfaces import UserRepositoryInterface
from users.models import Users


class UsersRepository(UserRepositoryInterface):
    def does_user_exists_by_email(self, email: str, id: Optional[int] = None):
        user_by_email = get_object_or_None(Users.objects.select_related('group'), email=email)
        user_by_id = get_object_or_None(Users.objects.select_related('group'), pk=id)
        if user_by_email != user_by_id and user_by_email is not None:
            raise InstanceAlreadyExists(f"User with email: {email} already exists!")

    def get_user_by_id(self, id: int) -> Users:
        user = get_object_or_None(Users.objects.select_related('group'), id=id)
        if not user:
            raise InstanceDoesNotExist(f"User with id: {id} does not exist!")

        return user

    def get_all_users_dto(self) -> Iterable[UsersDTO]:
        users = Users.objects.prefetch_related('group').all().order_by('id')

        return map(self.converter.to_dto, users, repeat(UsersDTO))

    def create_user(self, create_user_dto: CreateUserDTO) -> UsersDTO:
        user = Users.objects.create(
            **create_user_dto.__dict__
        )

        return self.converter.to_dto(user, UsersDTO)

    def update_user(self, update_user_dto: UpdateUserDTO, user: Users, group: Groups) -> UsersDTO:
        fields_to_update = update_user_dto.__dict__
        fields_to_update.update({'group': group})
        print(group)
        for field, value in fields_to_update.items():
            if value or value is False:
                setattr(user, field, value)

        if not group:
            user.group = None

        user.save()

        return self.converter.to_dto(user, UsersDTO)

    def delete_user(self, user_to_delete: Users) -> str:
        user_to_delete.delete()

        return 'User was successfully deleted!'
