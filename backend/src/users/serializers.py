from rest_framework import serializers

from groups.serializers import GroupsSerializer


class UsersSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=128)
    created = serializers.DateTimeField(editable=False, read_only=True)
    group = GroupsSerializer()
