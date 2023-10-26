from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.base_api import ApiBaseView
from core.containers import GroupsContainer
from core.exceptions import InstanceDoesNotExist, InstanceAlreadyExists, DeletingForbiddenException
from groups.dto import GroupsWithoutIDDTO, UpdateGroupsDTO
from groups.serializers import GroupsSerializer, UpdateGroupsSerializer


class GroupsAPIView(APIView, ApiBaseView):

    """
        Returns JSON of groups or only 1 group by id.
        Return depends on whether user put an id into the url.
    """
    def get(self, request, group_id=None):
        group_interactor = GroupsContainer.interactor()

        if group_id:
            try:
                group_dto = group_interactor.get_group_by_id(group_id)
            except InstanceDoesNotExist as exception:
                return self._create_response_not_found(exception)

            serialized_groups = GroupsSerializer(group_dto)

        else:
            group_dto = group_interactor.get_all_groups_dto()

            serialized_groups = GroupsSerializer(group_dto, many=True)

        return Response({'groups': serialized_groups.data}, status=status.HTTP_200_OK)

    """
    Accepts name, data_analytics, service_analytics, voice_analytics, queue_stats, voice_stats,
    video, smart_access and diagrams to create a group then returns message with the created group.
    Also checks whether name is already taken.
    """
    def post(self, request):
        create_group_serializer = GroupsSerializer(data=request.data)

        is_create_group_serializer_valid = create_group_serializer.is_valid()

        if not is_create_group_serializer_valid:
            return self._create_response_for_invalid_serializers(create_group_serializer)

        create_group_dto = GroupsWithoutIDDTO(**create_group_serializer.validated_data)

        groups_interactor = GroupsContainer.interactor()

        try:
            created_group = groups_interactor.create_group(create_group_dto)
        except InstanceAlreadyExists as exception:
            return self._create_response_for_exception(exception)

        serialized_group = GroupsSerializer(created_group)

        return Response({
            'message': 'Group was successfully created!',
            'group': serialized_group.data
        },
            status=status.HTTP_201_CREATED)

    """
    Accepts name, data_analytics, service_analytics, voice_analytics, queue_stats, voice_stats,
    video, smart_access and diagrams to update a group then returns message with the updated group.
    Also checks whether name is already taken but if name is the property of the very group
    it will not raise an error.
    """

    def patch(self, request, group_id):
        update_group_serializer = UpdateGroupsSerializer(data=request.data)

        is_update_group_serializer_valid = update_group_serializer.is_valid()

        if not is_update_group_serializer_valid:
            return self._create_response_for_invalid_serializers(update_group_serializer)

        update_group_dto = UpdateGroupsDTO(id=group_id, **update_group_serializer.validated_data)

        group_interactor = GroupsContainer.interactor()

        try:
            updated_group = group_interactor.update_group(update_group_dto)
        except (InstanceAlreadyExists, InstanceDoesNotExist) as exception:
            return self._create_response_for_exception(exception)

        serialized_group = GroupsSerializer(updated_group)

        return Response({
            'message': 'Group was successfully updated!',
            'group': serialized_group.data
        }, status=status.HTTP_201_CREATED)

    """
        Accepts group_id to delete a group.
        If id is wrong it will raise an error InstanceDoesNotExist.
        If group has members it will not let to delete that group.
    """

    def delete(self, request, group_id):
        group_interactor = GroupsContainer.interactor()

        try:
            message = group_interactor.delete_group(group_id)
        except (InstanceDoesNotExist, DeletingForbiddenException) as exception:
            return self._create_response_not_found(exception)

        return Response({'message': message}, status=status.HTTP_200_OK)
