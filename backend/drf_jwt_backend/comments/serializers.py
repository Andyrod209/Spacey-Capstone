from distutils.errors import CompileError
from rest_framework import serializers
from .models import Comment
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'user', 'post', 'text', 'likes', 'dislikes']