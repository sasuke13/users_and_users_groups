from auto_dataclass.dj_model_to_dataclass import FromOrmToDataclass
from dependency_injector import containers, providers

from groups.interactors import GroupsInteractor
from groups.repository import GroupsRepository
from users.interactor import UsersInteractor
from users.repositories import UsersRepository


class ConvertorsContainer(containers.DeclarativeContainer):
    from_queryset_to_dto = providers.Factory(FromOrmToDataclass)


class RepositoriesContainer(containers.DeclarativeContainer):
    user_repository = providers.Factory(
        UsersRepository,
        converter=ConvertorsContainer.from_queryset_to_dto
    )
    groups_repository = providers.Factory(
        GroupsRepository,
        converter=ConvertorsContainer.from_queryset_to_dto
    )


class InteractorsContainer(containers.DeclarativeContainer):
    groups_interactor = providers.Factory(
        GroupsInteractor,
        groups_repository=RepositoriesContainer.groups_repository
    )
    users_interactor = providers.Factory(
        UsersInteractor,
        users_repository=RepositoriesContainer.user_repository,
        groups_interactor=groups_interactor
    )


class UsersContainer(containers.DeclarativeContainer):
    repository = RepositoriesContainer.user_repository
    interactor = InteractorsContainer.users_interactor


class GroupsContainer(containers.DeclarativeContainer):
    repository = RepositoriesContainer.groups_repository
    interactor = InteractorsContainer.groups_interactor
