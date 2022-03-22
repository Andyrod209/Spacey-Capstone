from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

from .models import userProfile
from .serializers import userProfileSerializer

# Create your views here.
@api_view(['Get'])
@permission_classes([AllowAny])
def get_all_profiles(request):
    profile = userProfile.objects.all()
    serializer = userProfileSerializer(profile, many=True)
    return Response(serializer.data)

@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def profile_data(request):
    if request.method == 'POST':
        serializer = userProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET': 
        profile = userProfile.objects.filter(user_id=request.user.id)
        serializer = userProfileSerializer(profile, many=True)
        return Response(serializer.data)

@api_view(['PUT', 'GET'])
@permission_classes([IsAuthenticated])
def edit_profile(request, pk):
    if request.method == 'PUT':
        profile = userProfile.objects.get(user_id=pk)
        serializer = userProfileSerializer(profile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        profile = userProfile.objects.get(user_id=pk)
        serializer = userProfileSerializer(profile)
        return Response(serializer.data)