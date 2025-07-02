from django.db import models
from django.contrib.auth.models import User

class LoyaltyAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)
    tier = models.CharField(max_length=20, default="Bronze")
