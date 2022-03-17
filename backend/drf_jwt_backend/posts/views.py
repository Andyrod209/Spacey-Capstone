from django.shortcuts import render

# Create your views here.
@api_view(['GET'])
@permission_classes([AllowAny])