from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class userProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    about = models.CharField(max_length=250, blank=True)

