from django.db import models
from django.contrib.auth.models import User
from backend.drf_jwt_backend.comments.models import Comment

# Create your models here.
class Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
    text = models.CharField(max_length=250)
    likes = models.IntegerField()
    dislike = models.IntegerField()