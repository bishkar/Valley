from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny
from user.models import User
from user.serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
    
        user = User.objects.get(email=request.data['email'])
        token = MyTokenObtainPairSerializer.get_token(user)

        response.data = {
            "access": str(token.access_token),
            "refresh": str(token),
            "first_name": request.data['first_name'],
            "last_name": request.data['last_name'],
            "email": request.data['email']
        }
        return response
