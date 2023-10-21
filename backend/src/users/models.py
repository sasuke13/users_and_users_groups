from django.db import models
from groups.models import Groups


class Users(models.Model):
    email = models.EmailField(unique=True)
    created = models.DateTimeField(auto_now_add=True, editable=False)
    group = models.ForeignKey(to=Groups, related_name="users", on_delete=models.SET_NULL, null=True)
    admin = models.BooleanField(default=False)
