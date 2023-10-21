from django.db import models


class Groups(models.Model):
    name = models.CharField(max_length=50, unique=True)
    data_analytics = models.BooleanField(default=False)
    service_analytics = models.BooleanField(default=False)
    voice_analytics = models.BooleanField(default=False)
    queue_stats = models.BooleanField(default=False)
    voice_stats = models.BooleanField(default=False)
    video = models.BooleanField(default=False)
    smart_access = models.BooleanField(default=False)
    diagrams = models.BooleanField(default=False)
