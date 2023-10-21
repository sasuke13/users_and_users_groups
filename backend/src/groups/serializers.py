from rest_framework import serializers


class GroupsSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=50)
    data_analytics = serializers.BooleanField(required=False)
    service_analytics = serializers.BooleanField(required=False)
    voice_analytics = serializers.BooleanField(required=False)
    queue_stats = serializers.BooleanField(required=False)
    voice_stats = serializers.BooleanField(required=False)
    video = serializers.BooleanField(required=False)
    smart_access = serializers.BooleanField(required=False)
    diagrams = serializers.BooleanField(required=False)


class UpdateGroupsSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    name = serializers.CharField(max_length=50, required=False)
    data_analytics = serializers.BooleanField(required=False)
    service_analytics = serializers.BooleanField(required=False)
    voice_analytics = serializers.BooleanField(required=False)
    queue_stats = serializers.BooleanField(required=False)
    voice_stats = serializers.BooleanField(required=False)
    video = serializers.BooleanField(required=False)
    smart_access = serializers.BooleanField(required=False)
    diagrams = serializers.BooleanField(required=False)

