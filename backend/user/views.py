from django.shortcuts import render
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, status
from rest_framework.permissions import AllowAny

from api.schemas import *
from user.models import User
from user.serializers import MyTokenObtainPairSerializer, RegisterSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from user.utils import *


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    @swagger_auto_schema(responses=swagger_register_token_response,
                         operation_description="Use this endpoint to register and authenticate via email", request_body=RegisterSerializer)
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


class EmailTokenObtainPairView(TokenObtainPairView):
    @swagger_auto_schema(responses=swagger_auth_token_response,
                         operation_description="Use this endpoint to authenticate via email")
    def post(self, request, *args, **kwargs):
        return super().post(request, *args, **kwargs)       
