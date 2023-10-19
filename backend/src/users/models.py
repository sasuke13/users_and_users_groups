from django.db import models
from groups.models import Groups


class Users(models.Model):
    username = models.CharField(unique=True, max_length=128)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    group = models.ForeignKey(to=Groups, on_delete=models.SET_NULL, null=True)
