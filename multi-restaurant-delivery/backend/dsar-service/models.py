from django.db import models
from django.contrib.auth.models import User
class DSARRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=32, default="pending")
