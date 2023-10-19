from rest_framework import serializers


class GroupsSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=50)
    data_analytics = serializers.BooleanField(default=False)
    service_analytics = serializers.BooleanField(default=False)
    voice_analytics = serializers.BooleanField(default=False)
    queue_stats = serializers.BooleanField(default=False)
    voice_stats = serializers.BooleanField(default=False)
    video = serializers.BooleanField(default=False)
    smart_access = serializers.BooleanField(default=False)
    diagrams = serializers.BooleanField(default=False)
