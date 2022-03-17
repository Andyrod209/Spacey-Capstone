from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

from .models import Reply
from .serializers import ReplySerializer


# Create your views here.

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_replies(request, comment_id):
    replies = Reply.objects.filter(comment_id=comment_id)
    serializer = ReplySerializer(replies, many=True)
    return Response(serializer.data)

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
# may need post_id to know where to post comment... maybe not
def create_reply(request):
    if request.method == 'POST':
        serializer = ReplySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET': 
        reply = Reply.objects.filter(user_id=request.user.id)
        serializer = ReplySerializer(reply, many=True)
        return Response(serializer.data)

@api_view(['PUT', 'GET'])
@permission_classes([IsAuthenticated])
def update_reply(request, pk):
    if request.method == 'PUT':
        reply = Reply.objects.get(pk=pk)
        serializer = ReplySerializer(reply, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        reply = Reply.objects.get(pk=pk)
        serializer = ReplySerializer(reply)
        return Response(serializer.data)
        
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_reply(request, pk):
    replies = Reply.objects.get(pk=pk)
    if replies.delete():
        return Response(status.HTTP_204_NO_CONTENT)
    return Response(status.HTTP_400_BAD_REQUEST)