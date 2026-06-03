from django.shortcuts import render
from .serializers import UserSerializer
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]    # Allow anyone to access this view 
    
class ProtectedView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]  # Change to IsAuthenticated for real protection
    
    def get(self, request):
        response = {
            'status': 'Request was permitted',
        }
        return Response(response)