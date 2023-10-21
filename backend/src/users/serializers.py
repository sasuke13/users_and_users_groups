from rest_framework import serializers

from groups.serializers import GroupsSerializer


class UsersSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()
    created = serializers.DateTimeField(read_only=True)
    group = GroupsSerializer()
    admin = serializers.BooleanField()


class CreateUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    group_id = serializers.IntegerField(required=False, default=None)
    admin = serializers.BooleanField(required=False)


class UpdateUserSerializer(serializers.Serializer):
    email = serializers.EmailField(required=False)
    group_id = serializers.IntegerField(required=False, default=None)
    admin = serializers.BooleanField(required=False)
