from dataclasses import fields
from rest_framework import serializers
from .models import Reply

class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        fields = ['id', 'user','comment', 'text', 'likes', 'dislikes']