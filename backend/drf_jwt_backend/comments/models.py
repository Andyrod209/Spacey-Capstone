from django.db import models
from django.contrib.auth.models import User
from posts.models import Post

# Create your models here.
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    text = models.CharField(max_length=500)
    likes = models.IntegerField()
    dislikes = models.IntegerField()