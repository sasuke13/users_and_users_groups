from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from core.base_api import ApiBaseView
from core.containers import UsersContainer
from core.exceptions import InstanceDoesNotExist, InstanceAlreadyExists
from users.dto import CreateUserDTO, UpdateUserDTO
from users.serializers import UsersSerializer, CreateUserSerializer, UpdateUserSerializer


class UsersAPIView(APIView, ApiBaseView):
    def get(self, request, user_id=None):
        user_interactor = UsersContainer.interactor()

        if user_id:
            try:
                user_dto = user_interactor.get_user_by_id(user_id)
            except InstanceDoesNotExist as exception:
                return self._create_response_not_found(exception)

            serialized_users = UsersSerializer(user_dto)

        else:
            users_dto = user_interactor.get_all_users_dto()

            serialized_users = UsersSerializer(users_dto, many=True)

        return Response({'users': serialized_users.data}, status=status.HTTP_200_OK)

    def post(self, request):
        create_user_serializer = CreateUserSerializer(data=request.data)

        is_create_user_serializer_valid = create_user_serializer.is_valid()

        if not is_create_user_serializer_valid:
            return self._create_response_for_invalid_serializers(create_user_serializer)

        create_user_dto = CreateUserDTO(**create_user_serializer.validated_data)

        users_interactor = UsersContainer.interactor()

        try:
            created_user = users_interactor.create_user(create_user_dto)
        except InstanceAlreadyExists as exception:
            return self._create_response_for_exception(exception)

        serialized_user = UsersSerializer(created_user)

        return Response({
            'message': 'User was successfully created!',
            'user': serialized_user.data
        }, status=status.HTTP_201_CREATED)

    def patch(self, request, user_id):
        update_user_serializer = UpdateUserSerializer(data=request.data)

        is_update_user_serializer_valid = update_user_serializer.is_valid()

        if not is_update_user_serializer_valid:
            return self._create_response_for_invalid_serializers(update_user_serializer)

        update_user_dto = UpdateUserDTO(user_id=user_id, **update_user_serializer.validated_data)

        users_interactor = UsersContainer.interactor()

        try:
            created_user = users_interactor.update_user(update_user_dto)
        except (InstanceAlreadyExists, InstanceDoesNotExist) as exception:
            return self._create_response_for_exception(exception)

        serialized_user = UsersSerializer(created_user)

        return Response({
            'message': 'User was successfully updated!',
            'user': serialized_user.data
        }, status=status.HTTP_201_CREATED)

    def delete(self, request, user_id):
        user_interactor = UsersContainer.interactor()

        try:
            message = user_interactor.delete_user(user_id)
        except InstanceDoesNotExist as exception:
            return self._create_response_not_found(exception)

        return Response({'message': message}, status=status.HTTP_200_OK)
