from django.db import models
from django.contrib.auth.models import User
from backend.drf_jwt_backend.posts.models import Post

# Create your models here.
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post_id = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=500)
    likes = models.IntegerField()
    Dislikes = models.IntegerField()